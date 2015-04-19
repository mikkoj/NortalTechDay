var _ = require('underscore')
var React = require('react-native')
var {
  ListView,
  StyleSheet,
  Navigator
} = React

var View = require('./View')
var Text = require('./Text')
var Loading = require('./Loading')
var StoreWatchMixin = require('./StoreWatchMixin')
var TracksStore = require('../stores/TracksStore')
var TrackListItem = require('./TrackListItem')
var SessionsView = require('./SessionsView')

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

var TracksView = React.createClass({
  mixins: [
    StoreWatchMixin,
  ],

  getInitialState() {
    return {
      dataSource: baseDataSource.cloneWithRows(this.getTracks()),
    }
  },

  componentDidMount() {
    if (this.tracksLoaded() === false) {
      this.loadTracks()
    }
  },

  getStoreWatches() {
    this.watchStore(TracksStore, _.debounce(() => {
      if (this.isMounted()) {
        this.setState({dataSource: baseDataSource.cloneWithRows(this.getTracks())})
      }
    }, 100))
  },

  loadTracks() {
    return TracksStore.fetch()
  },

  getTracks() {
    return TracksStore.all()
  },

  tracksLoaded() {
    var tracks = this.getTracks()
    if (!(tracks && tracks.length)) {
      return false
    }
    return true
  },

  gotoTrack(track, navigator) {
    navigator.push({id: 'track', track: track})
  },

  renderTrack(track, navigator) {
    console.log(track)
    return (
      <TrackListItem
        track={track}
        onSelectTrack={() => this.gotoTrack(track, navigator)} />
    )
  },

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{'TRACKS'}</Text>
      </View>
    )
  },

  renderTrackList(navigator) {
    if (this.tracksLoaded() === false) {
      return <Loading />
    }

    return (
       <View style={styles.rootContainer}>
         {this.renderHeader()}

        <ListView
          contentContainerStyle={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(track) => this.renderTrack(track, navigator)}
          loadData={this.loadTracks}
          scrollEnabled={false} />
       </View>
    )
  },

  renderScene: function(route, nav) {
    switch (route.id) {
      case 'track':
        return <SessionsView track={route.track} navigator={nav} />

      default:
        return this.renderTrackList(nav)
    }
  },

  render: function() {
    return (
      <Navigator
        style={styles.rootContainer}
        initialRoute={{ message: "Tracks" }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight
        }} />
    )
  }

})

var styles = StyleSheet.create({
  
    rootContainer: {
      flexDirection: 'column'
    },

    headerContainer: {
      marginTop: 45,
      paddingBottom: 5,
    },

    header: {
      fontFamily: 'Avenir',
      fontSize: 23,
      fontWeight: '700',
      alignSelf: 'center',
      marginTop: 0,
      marginBottom: 0,
    },

    listView: {
      flex: 1,
    }
})

module.exports = TracksView