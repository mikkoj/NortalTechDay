
'use strict'

var React = require('react-native')
var {
  Image,
  LayoutAnimation,
  ListView,
  StyleSheet,
  TouchableOpacity,
} = React

var Icon = require('FAKIconImage')
var View = require('./View')
var Text = require('./Text')
var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

var SessionListItem = React.createClass({

  getInitialState: function() {
    return { dir: 'closed' }
  },

  onPressSession: function() {
    var config = animations.layout.easeInEaseOut
    LayoutAnimation.configureNext(config)
    this.setState({
      dir: this.state.dir === 'closed' ? 'open' : 'closed',
    })
  },

  renderContentClosed: function(session) {
    var startTimeStyle = [styles.rowClosedStartTime]
    var titleStyle = [styles.rowClosedTitle]
    var sessionTitle = session.title

    if (session.title.toUpperCase() === 'LUNCH') {
      titleStyle.push(styles.rowClosedLunch)
    }
    return (
      <TouchableOpacity onPress={this.onPressSession}
                        activeOpacity={0.7}>
        <View style={[styles.rowClosed, {flexDirection: 'row'}]}>
            <Text style={startTimeStyle}>{session.startTime}</Text>
            <View style={styles.rowClosedTitleContainer}>
              <Text style={titleStyle} numberOfLines={2}>
                {sessionTitle}
              </Text>
            </View>
        </View>
      </TouchableOpacity>
    )
  },

  renderContentOpen: function(session) {
    return (
      <TouchableOpacity onPress={this.onPressSession}
                        activeOpacity={0.7}>
        <View style={[styles.rowOpen, {flexDirection: 'column'}]}>
            <Text style={styles.rowOpenTitle}>{session.title}</Text>

            <View style={styles.rowOpenSubtitles}>
              <View style={styles.rowOpenRoomContainer}>
                <Icon name='ion|ios-clock-outline'
                      size={12}
                      color='#000'
                      style={styles.timeIcon} />
                <Text style={styles.rowOpenTime}>{session.startTime} {'-'} {session.endTime}</Text>
              </View>
 
              <Text style={styles.rowOpenLanguage}>{session.language}</Text>
              <View style={styles.rowOpenRoomContainer}>
                <Icon name='ion|ios-navigate-outline'
                      size={12}
                      color='#000'
                      style={styles.roomIcon} />
                <Text style={styles.rowOpenRoom}>{session.room}</Text>
              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{session.description}</Text>
            </View>

            {this.renderSpeakerContent(session)}
        </View>
      </TouchableOpacity>
    )
  },

  renderSpeakerContent: function(session) {
    if (session.speakers.length === 0) {
      return <View />
    }

    var speaker = session.speakers[0]
    var speakerAvatarUri = speaker.avatar

    return (
      <View style={styles.speakerContainer}>
        <Image
          source={{uri: speakerAvatarUri}}
          style={styles.speakerAvatar} />
        <Text style={styles.speaker}>{speaker.name}</Text>
      </View>
    )
  },  

  render: function() {
    var {session} = this.props
    if (this.state.dir === 'open') {
      return this.renderContentOpen(session)
    }
    return this.renderContentClosed(session)
  }

})

var styles = StyleSheet.create({
  rowClosed: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 12,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#EAEAEA',
    borderRadius: 4,
  },

  rowClosedStartTime: {
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: '800'
  },

  rowClosedTitleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },

  rowClosedTitle: {
    fontFamily: 'Avenir',
    fontSize: 13,
    fontWeight: 'normal',
    marginLeft: 12,
  },

  rowClosedLunch: {
    fontSize: 13,
    color: '#777',
  },

  rowOpen: {
    justifyContent: 'space-between',
    marginHorizontal: 5,
    marginVertical: 3,
    padding: 12,
    paddingVertical: 0,
    backgroundColor: '#EAEAEA',
    borderRadius: 4,
  },

  rowOpenTitle: {
    fontFamily: 'Avenir',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 17,
    marginBottom: 17
  },

  rowOpenSubtitles: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5
  },

  timeIcon: {
    width: 12,
    height: 15.5,
    marginRight: 3
  },

  rowOpenTime: {
    fontFamily: 'Avenir',
    fontSize: 12
  },

  rowOpenLanguage: {
    fontFamily: 'Avenir',
    fontSize: 12,
    alignSelf: 'center'
  },

  rowOpenRoomContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },

  roomIcon: {
    width: 23,
    height: 15.5
  },

  rowOpenRoom: {
    fontFamily: 'Avenir',
    fontSize: 12
  },

  descriptionContainer: {
    backgroundColor: 'transparent',
    marginTop: 5
  },

  description: {
    fontFamily: 'Avenir',
    fontSize: 12
  },

  speakerContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },

  speakerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 7
  },

  speaker: {
    fontFamily: 'Avenir',
    fontSize: 12,
  }
})

var animations = {
  layout: {
    easeInEaseOut: {
      duration: 260,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 30,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
}

module.exports = SessionListItem