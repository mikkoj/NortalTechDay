var _ = require('underscore')
var React = require('react-native')
var {
  ListView,
  StyleSheet,
  ScrollView,
  MapView,
  Image
} = React

var View = require('./View')
var Text = require('./Text')
var TrackListItem = require('./TrackListItem')
var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

var RoomsView = React.createClass({

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{'ROOMS'}</Text>
      </View>
    )
  },

  render() {
    return (
       <View style={styles.rootContainer}>
         {this.renderHeader()}

        <ScrollView contentContainerStyle={styles.venueContainer}
                    contentInset={{bottom: 30}}
                    automaticallyAdjustContentInsets={false}>
          <Text style={styles.firstFloorHeader}>{'1. FLOOR'}</Text>
          <Image
              style={[
                {width: 350, height: 350},
                {resizeMode: Image.resizeMode.contain}
              ]}
            source={require('image!venue-1st-floor')} />

          <Text style={styles.secondFloorHeader}>{'2. FLOOR'}</Text>
          <Image
              style={[
                {width: 600, height: 650},
                {resizeMode: Image.resizeMode.contain}
              ]}
            source={require('image!venue-2nd-floor')} />
        </ScrollView>
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
      borderBottomWidth: 0.3,
      borderColor: '#000',
      paddingTop: 33,
      paddingBottom: 0,
      marginBottom: 0
    },

    header: {
      fontFamily: 'Avenir',
      fontSize: 17,
      alignSelf: 'center',
    },

    venueContainer: {
      backgroundColor: 'transparent',
      alignItems: 'center',
      paddingVertical: 20,
      marginVertical: 0
    },

    firstFloorHeader: {
      fontFamily: 'Avenir',
      fontSize: 17,
      color: '#000'
    },

    secondFloorHeader: {
      fontFamily: 'Avenir',
      fontSize: 17,
      marginTop: 20,
      color: '#000'
    }

})

module.exports = RoomsView