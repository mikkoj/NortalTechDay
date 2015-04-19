//
//  TwitterSearchManager.m
//  NortalTechDay
//
//  @mikkoj
//  16/04/15
//

#import "TwitterSearchManager.h"
#import <Fabric/Fabric.h>
#import <TwitterKit/TwitterKit.h>

@implementation TwitterSearchManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(searchForTweets:(NSString *)query callback:(RCTResponseSenderBlock)callback)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    // 1. Guest login
    [[Twitter sharedInstance] logInGuestWithCompletion:^(TWTRGuestSession *guestSession, NSError *guestLoginError)
    {
      if (guestSession)
      {
        [self sendSearchRequest:query callback:callback];
      }
      else
      {
        NSLog(@"Guest login error: %@", [guestLoginError localizedDescription]);
        callback(@[[guestLoginError localizedDescription], [NSNull null]]);
      }
    }];
    
  });
}

- (void)sendSearchRequest:(NSString *)query callback:(RCTResponseSenderBlock)callback
{
  // Let's first create the request
  NSString *statusesShowEndpoint = @"https://api.twitter.com/1.1/search/tweets.json";
  NSDictionary *params = @{@"q" : query};
  NSError *apiRequestError;
  NSURLRequest *request = [[[Twitter sharedInstance] APIClient]
                           URLRequestWithMethod:@"GET"
                           URL:statusesShowEndpoint
                           parameters:params
                           error:&apiRequestError];
  if (request)
  {
    // ..and then send it
    [[[Twitter sharedInstance] APIClient]
     sendTwitterRequest:request
     completion:^(NSURLResponse *response,
                  NSData *data,
                  NSError *connectionError)
     {
       [self handleTwitterSearchResponse:connectionError callback:callback data:data query:query];
     }];
  }
  else
  {
    NSLog(@"API Request Error: %@", apiRequestError);
    callback(@[[apiRequestError localizedDescription], [NSNull null]]);
  }
}


- (void)handleTwitterSearchResponse:(NSError *)connectionError callback:(RCTResponseSenderBlock)callback data:(NSData *)data query:(NSString *)query
{
  if (data)
  {
    // Let's parse the response data
    NSError *jsonError;
    NSDictionary *jsonDict = [NSJSONSerialization
                              JSONObjectWithData:data
                              options:0
                              error:&jsonError];
    if (jsonError)
    {
      callback(@[[jsonError localizedDescription], [NSNull null]]);
    }
    else
    {
      // We'll extract the statuses and call the callback back to JavaScript
      NSArray *statuses = [jsonDict objectForKey:@"statuses"];
      callback(@[[NSNull null], statuses]);
    }
  }
  else
  {
    if ([connectionError code] == TWTRAPIErrorCodeBadGuestToken) // 239  TWTRAPIErrorCode.TWTRAPIErrorCodeBadGuestToken
    {
      NSLog(@"Guest user token has expired. Trying again.. (%@)", connectionError);
      [self searchForTweets:query callback:callback];
    }
    else
    {
      NSLog(@"Connection Error: %@", connectionError);
      callback(@[[connectionError localizedDescription], [NSNull null]]);
    }
  }
}

@end