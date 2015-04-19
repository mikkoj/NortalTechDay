var urlJoin = require('url-join')
var BaseStore = require('./BaseStore')
var config = require('../config')

const API_PATH = urlJoin(config.apiHost, '/tracks')

class TracksStore extends BaseStore {
  static url() { return API_PATH }

  static fetch() {
    console.log("fetching " + this.url())
    return fetch(this.url())
                .then(response => {
                  var responseJson = response.json()
                  return responseJson
                })
  }

  fetch() {
    return this.constructor.fetch()
               .then((items) => {
                 this.reset(items)
                 this.emitChange()
                 return items
               })
  }
}

module.exports = new TracksStore