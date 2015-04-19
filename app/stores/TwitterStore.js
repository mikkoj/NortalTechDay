
var _ = require('underscore')
var BaseStore = require('./BaseStore')
var Promise = require("bluebird")
var TwitterSearchManager = require('NativeModules').TwitterSearchManager;

var query = "#nortal"

class TwitterStore extends BaseStore {

  static fetch() {
    return new Promise(function (resolve, reject) {
      console.log("> Calling Twitter REST API")
      TwitterSearchManager.searchForTweets(query, (error, tweets) => {
        if (error) {
          console.log("> Twitter error: " + error)
          reject(error)
        }
        if (tweets) {
          console.log("> Twitter OK - tweets fetched: " + tweets.length)
          resolve(tweets)
        }
      })
    });
  }

  fetch() {
    return this.constructor.fetch()
               .then((items) => {
                 this.reset(items)
                 this.emitChange()
                 return items
               })
  }
}

module.exports = new TwitterStore
