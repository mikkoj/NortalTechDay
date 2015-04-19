var _ = require('underscore')
var React = require('react-native')
var {
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} = React

var Text = require('./Text')
var Icon = require('FAKIconImage')
var Loading = require('./Loading')
var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
var StoreWatchMixin = require('./StoreWatchMixin')
var TwitterStore = require('../stores/TwitterStore')

var SocialView = React.createClass({
  mixins: [
    StoreWatchMixin,
  ],

  getInitialState() {
    return {
      storeError: null,
      dataSource: baseDataSource.cloneWithRows(this.getTweets()),
    }
  },

  componentDidMount() {
    if (this.tweetsLoaded() === false) {
      this.loadTweets()
    }
  },

  getStoreWatches() {
    this.watchStore(TwitterStore, _.debounce(() => {
      if (this.isMounted()) {
        console.log("watch notified a change")
        this.setState({dataSource: baseDataSource.cloneWithRows(this.getTweets())})
      }
    }, 100))
  },

  loadTweets() {
    return TwitterStore.fetch()
                       .catch(error => {
                         this.setState({ storeError: error })
                       })
  },

  getTweets() {
    return TwitterStore.all()
  },

  tweetsLoaded() {
    var tweets = this.getTweets()
    if (!(tweets && tweets.length)) {
      return false
    }
    return true
  },

  refreshTweets() {
    console.log("refreshTweets pressed")
    TwitterStore.reset()
    this.forceUpdate()
    this.loadTweets()
  },

  renderHeader() {
    return (
      <View style={{
        borderBottomWidth: 0.2,
        borderColor: '#000',
        paddingTop: 30,
        paddingBottom: 5,
        marginVertical: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <View style={{width: 40}} />

        <Text style={{
          fontFamily: 'Avenir',
          fontSize: 17,
          alignSelf: 'center',
          marginTop: 0,
          marginBottom: 0
        }}>
          {'#NORTAL'}
        </Text>

        <TouchableOpacity style={styles.button}
                          underlayColor="#333"
                          onPress={this.refreshTweets}>
          <View style={{
            flexDirection: 'row',
            width: 40,
            marginVertical: 0,
            paddingTop: 0
          }}>
            <Icon name='ion|ios-refresh-empty'
                  size={30}
                  color='#000'
                  style={{width: 30, height: 30}} />
          </View>
        </TouchableOpacity>
      </View>
    )
  },

  renderTweet(tweet) {
    var userAvatarUri = tweet.user.profile_image_url

    return (
      <View style={styles.tweetContainer}>
        <View style={styles.tweetTopContainer}>
          <Image
            source={{uri: userAvatarUri}}
            style={styles.userAvatar} />

          <View style={styles.tweetTextContainer}>
            <View style={styles.tweetUserContainer}>
              <Text style={styles.tweetUser}>{tweet.user.name}</Text>
              <Text style={styles.tweetScreenName}>@{tweet.user.screen_name}</Text>
            </View>
            <Text style={styles.tweetText}>{tweet.text}</Text>

          </View>
        </View>
        {this.renderTweetMedia(tweet)}

      </View>
    )
  },

  renderTweetMedia(tweet) {
    if (tweet.entities.media &&
        tweet.entities.media.length > 0)
    { 
      return (
        <View style={styles.tweetMediaContainer}>
          <Image source={{uri: tweet.entities.media[0].media_url}}
                 style={[{width: 500, height: 300},
                        {resizeMode: Image.resizeMode.contain}]} />
        </View>
      )
    }
  },

  renderTweets() {
    if (this.state.storeError) {
      return <Text>{this.state.storeError}</Text>
    }

    if (this.tweetsLoaded() === false) {
      return <Loading />
    }

    return <ListView
              style={styles.tweetsListView}
              dataSource={this.state.dataSource}              
              renderRow={this.renderTweet}
              refreshDescription="tweets"
              automaticallyAdjustContentInsets={false}
              contentInset={{bottom: 30}} />
  },

  render() {
    return (
      <View style={styles.rootContainer}>

       {this.renderHeader()}
       {this.renderTweets()}
      
      </View>
    )
  }
})

var styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column'
  },

  headerContainer: {
    borderBottomWidth: 0.1,
    borderColor: '#000',
    paddingBottom: 10
  },

  tweetsListView: {
    paddingTop: 16,
  },

  tweetContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginTop: 0,
    marginBottom: 10
  },

  tweetTopContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    marginTop: 0,
  },

  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10
  },

  tweetTextContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 10,
  },

  tweetUserContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginBottom: -4
  },

  tweetUser: {
    fontFamily: 'Avenir',
    fontSize: 11,
    flexWrap: 'wrap',
    fontWeight: '800'
  },

  tweetScreenName: {
    fontFamily: 'Avenir',
    fontSize: 11,
    marginLeft: 5
  },

  tweetText: {
    marginTop: -4,
    fontFamily: 'Avenir',
    fontSize: 14,
  },

  tweetMediaContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginHorizontal: 50,
    marginBottom: 20
  },
})

module.exports = SocialView