var _ = require('underscore')
var moment = require('moment')
var React = require('react-native')
var {
  Image,
  PixelRatio,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} = React

var View = require('./View')
var Text = require('./Text')

var TrackListItem = React.createClass({

  handleSelectTrack() {
    this.props.onSelectTrack(this.props.track)
  },

  getBackgroundImageForTrack(trackTitle) {
    switch (trackTitle){
      case "ANALYSIS":
        return require('image!track-analysis')
      case "DEVELOPMENT":
        return require('image!track-development')
      case "TESTING":
        return require('image!track-testing')
      default:
        return require('image!track-development')
    }
  },

  render() {
    var trackTitle = this.props.track.title.toUpperCase()

    return (
        <TouchableOpacity onPress={this.handleSelectTrack}
                          activeOpacity={0.7}
                          underlayColor={'white'}>
          <Image source={this.getBackgroundImageForTrack(trackTitle)}
                 style={[styles.trackBackgroundImage,
                         {resizeMode: Image.resizeMode.cover}]}>
            <Text style={styles.trackTitle}>
              {trackTitle}
            </Text>
          </Image>
        </TouchableOpacity>
    )
  }
})

var styles = StyleSheet.create({
  tracksContainer: {
    alignItems: 'center'
  },

  trackBackgroundImage: {
    backgroundColor: 'transparent',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  trackTitle: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Avenir',
    fontWeight: '800',
    paddingTop: 10
  }
})

module.exports = TrackListItem