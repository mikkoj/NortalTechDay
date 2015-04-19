/*
 *  Nortal TechDay React Native App
 *  Mikko Junnila
 *  @mikkoj
 *  http://github.com/mikkoj/NortalTechDay
 */


'use strict';

var React = require('react-native')
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
  ScrollView
} = React

var Icon = require('FAKIconImage')
var SMXTabBarIOS = require('SMXTabBarIOS')
var SMXTabBarItemIOS = SMXTabBarIOS.Item

var InitialTab = "schedule";

var Tabs = [
  {
    name: "schedule",
    iconName: "fontawesome|calendar",
    iconSize: 26,
    content: require('./components/TracksView')
  },
  {
    name: "info",
    iconName: "foundation|info",
    iconSize: 30,
    content: require('./components/InfoView')
  },
  {
    name: "rooms",
    iconName: "ion|ios-navigate",
    iconSize: 29,
    content: require('./components/RoomsView')
  },
  {
    name: "social",
    iconName: "ion|chatboxes",
    iconSize: 30,
    content: require('./components/SocialView')
  }
]

var NortalTechDay = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: InitialTab,
    }
  },

  renderTab: function(tab) {
      var TabContent = tab.content
      return (
        <SMXTabBarItemIOS
          name={tab.name}
          iconName={tab.iconName}
          title={''}
          iconSize={tab.iconSize}
          selected={this.state.selectedTab === tab.name}
          onPress={() => {
            this.setState({
              selectedTab: tab.name,
            });
          }}>
          <TabContent />
        </SMXTabBarItemIOS>
      )
  },
  
  render: function() {
    var self = this;

    return (
      <SMXTabBarIOS
        selectedTab={self.state.selectedTab}
        tintColor={'green'}
        barTintColor={'#fff'}>

         {Tabs.map(this.renderTab)}

      </SMXTabBarIOS>
    )
  },
})

module.exports = NortalTechDay