### Nortal TechDay 2015 Conference React Native App
<p align="center">
  <img src="http://res.cloudinary.com/mikkoj/image/upload/v1467119333/nortal-techday-1.mov_triupn.gif" alt="" width="400 "/>
  <img src="http://res.cloudinary.com/mikkoj/image/upload/v1467119489/nortal-techday-2.mov_lcvqqx.gif" alt="" width="400 "/>
</p>

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
    }]

# License
MIT
