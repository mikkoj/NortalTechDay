
'use strict'

var React = require('react-native')
var {
  Image,
  LayoutAnimation,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} = React

var View = require('./View')
var Text = require('./Text')
var SessionListItem = require('./SessionListItem')
var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
var Icon = require('FAKIconImage')

var SessionsView = React.createClass({
  getInitialState() {
    return {
      dataSource: baseDataSource.cloneWithRows(this.getSessions()),
    }
  },

  getSessions() {
    return this.props.track.sessions
  },

  goBack() {
    this.props.navigator.pop()
  },

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={this.goBack}>
          <View style={styles.backButtonContainer}>
            <Icon name='ion|ios-arrow-back'
                  size={18}
                  color='#000'
                  style={styles.backButtonIcon} />
            <Text style={styles.buttonText}>{'TRACKS'}</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.headerText}>{this.props.track.title.toUpperCase()}</Text>

        <View style={{width: 90}} />
      </View>
    )
  },

  renderRow: function(session): ReactElement {
    return (<SessionListItem session={session}/>)
  },

  render: function() {
    return (
      <View style={styles.rootContainer}>
        {this.renderHeader()}
        <ListView
          contentContainerStyle={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />

      </View>
    )
  },
})

var styles = StyleSheet.create({

  rootContainer: {
    flex: 1,
  },

  headerContainer: {
    borderBottomWidth: 0.2,
    borderColor: '#000',
    paddingTop: 35,
    paddingBottom: 0,
    marginVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  backButtonContainer: {
    flexDirection: 'row',
    marginVertical: 0,
    width: 90,
    paddingTop: 4
  },

  backButtonIcon: {
    width: 25,
    height: 17
  },

  buttonText: {
    fontFamily: 'Avenir',
    fontSize: 14,
  },

  headerText: {
    fontFamily: 'Avenir',
    fontSize: 18,
    alignSelf: 'center',
    marginVertical: 0,
  },

  listView: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    padding: 10,
    paddingVertical: 0,
    marginVertical: 0
  }

})

module.exports = SessionsView
