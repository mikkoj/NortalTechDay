# Nortal TechDay 2015 Conference React Native App
![1](http://f.cl.ly/items/2i1T2V081L2d011B3q3n/nortal-techday-1.mov.gif)
![2](http://f.cl.ly/items/2d0t3A3v0a1w1s3e1i3M/nortal-techday-2.mov.gif)

## Dependencies
- [TwitterKit](https://dev.twitter.com/twitter-kit/ios)
  (use the Fabric Mac-app or manually insert API keys in `Info.plist`)
- [react-native-icons](https://github.com/corymsmith/react-native-icons)

## API
`config.js` should have the root address for the API

######`/tracks` (full example at stores/examples/tracks.json)
    [{
      "id": 1,
      "title": "Development",
      "sessions": [{
        "title": "Talk title",
        "startTime": "10:00",
        "endTime": "10:45",
        "room": "8A",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "speakers": [{
          "name": "Speaker",
          "avatar": "http://www.nortal.com/speaker.png",
          "twitter": "@speaker"
        }],
        "language": "English"
      }]
    }]`

# License
MIT