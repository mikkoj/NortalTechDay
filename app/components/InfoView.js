var React = require('react-native')
var {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  LinkingIOS
} = React

var Text = require('./Text')
var Icon = require('FAKIconImage')
var ActionSheetIOS = require('ActionSheetIOS')

var InfoView = React.createClass({

  onPressLocation() {
    var destinationQuery = "Meriton Grand Conference & Spa, Tallinn"
    var googleMapsFullUrl = "comgooglemaps://?q=" + encodeURIComponent(destinationQuery)
    var appleMapsFullUrl = "http://maps.apple.com/maps?q=" + encodeURIComponent(destinationQuery)

    LinkingIOS.canOpenURL(googleMapsFullUrl, (supported) => {
      if (supported) {
        LinkingIOS.openURL(googleMapsFullUrl)
      } else {
        LinkingIOS.canOpenURL(appleMapsFullUrl, (supported) => {
          if (supported) {
            LinkingIOS.openURL(appleMapsFullUrl)
          }
        })
      }
    })
  },

  onPressContact() {
     var actions = [
        'Call the Conference Center',
        'Email the Conference Center',
        'Cancel',
      ]
      var CallConferenceCenterIndex = 0;
      var EmailConferenceCenterIndex = 1;
      var CancelIndex = 2
      ActionSheetIOS.showActionSheetWithOptions({
      options: actions,
      cancelButtonIndex: CancelIndex
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        
        case CallConferenceCenterIndex:
          this.openDeviceUrl("telprompt://+3726288100")
          break

        case EmailConferenceCenterIndex:
          this.openDeviceUrl("mailto:conferencespa@meritonhotels.com")
          break
        
        default:
          break
      }
    })
  },

  openDeviceUrl(url) {
    LinkingIOS.canOpenURL(url, (supported) => {
      console.log("url " + url + " - supported " + supported)
      if (supported) {
        LinkingIOS.openURL(url)
      }
    })
  },


  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.header}>{'Nortal TechDay 2015'}</Text>
          <Text style={styles.subtext}>{'22.5.2015'}</Text>

          <TouchableOpacity onPress={this.onPressLocation}
                            activeOpacity={0.7}>
            <View style={styles.locationContainer}>
                <Icon name='ion|navigate'
                      size={15}
                      color='#000'
                      style={styles.locationIcon} />
                <Text style={styles.subtext}>{'Meriton Grand Conference & Spa'}</Text>
                <Text style={styles.subtext}>{'Toompuiestee 27, 10149 Tallinn'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onPressContact}
                            activeOpacity={0.7}>
            <View style={styles.contactContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name='ion|email'
                        size={18}
                        color='#000'
                        style={styles.contactIcon} />
                  <Icon name='ion|ios-telephone'
                        size={18}
                        color='#000'
                        style={styles.contactIcon} />
                </View>
                <Text style={styles.subtext}>{'conferencespa@meritonhotels.com'}</Text>
                <Text style={styles.subtext}>{'+372 62 88 100'}</Text>
            </View>
          </TouchableOpacity>

            <View style={styles.footerContainer}>
                <Text style={styles.hashtag}>{'#NortalTechDay'}</Text>
                <Image style={[styles.image,
                              {resizeMode: Image.resizeMode.contain}]}
                       source={require('image!nortal-logo-vertical')} />
                <Text style={styles.nortalUrl}>{'www.nortal.com'}</Text>
            </View>
      </View>
    )
  }
})


var styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent',
      alignItems: 'center',
      paddingTop: 40,
      paddingBottom: 57,
      justifyContent: 'space-between'
    },

    header: {
      backgroundColor: 'transparent',
      fontFamily: 'Avenir Book',
      fontWeight: 'normal',
      fontSize: 24
    },

    locationContainer: {
      flexDirection: 'column',
      backgroundColor: 'transparent',
      alignItems: 'center',
      backgroundColor: '#EFE',
      borderRadius: 10,
      padding: 10,
      paddingHorizontal: 15
    },

    locationIcon: {
      width: 18,
      height: 30,
      marginBottom: 5
    },

    subtext: {
      backgroundColor: 'transparent',
      fontFamily: 'Avenir Book',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: 16
    },

    contactContainer: {
      flexDirection: 'column',
      backgroundColor: 'transparent',
      alignItems: 'center',
      backgroundColor: '#fee',
      borderRadius: 10,
      padding: 10,
      paddingHorizontal: 15
    },

    contactIcon: {
      width: 18,
      height: 30,
      marginBottom: 5,
      marginHorizontal: 2
    },

    footerContainer: {
      flexDirection: 'column',
      backgroundColor: 'transparent',
      alignItems: 'center',
      marginTop: 15
    },

    hashtag: {
      fontFamily: 'Avenir Book',
      fontWeight: 'normal',
      fontSize: 19,
    },

    image: {
      width: 60,
      height: 60,
      marginVertical: 10
    },

    nortalUrl: {
      fontFamily: 'Avenir Book',
      fontWeight: 'normal',
      fontSize: 16,
    },

})

module.exports = InfoView
