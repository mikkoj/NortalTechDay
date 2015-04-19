/*
 * Nortal TechDay React Native App
 * Mikko Junnila
 * @mikkoj
 * http://github.com/mikkoj/NortalTechDay
 */

'use strict';

var React = require('react-native')
var {
  AppRegistry
} = React

var NortalTechDay = require('./app/app')

AppRegistry.registerComponent('NortalTechDay', () => NortalTechDay)
