export default class AbstractService {
  constructor (game, gameSoket, object, relations) {
    if (new.target === AbstractService) {
      throw new TypeError('Cannot construct AbstractService instances directly')
    }

    this._game = game
    this._gameSoket = gameSoket
    this._object = object
    this._relations = relations

    this._initListeners()
  }

  _observer (eventName) {
    return (request) => {
      this._gameSoket.emit(eventName, request)
    }
  }

  _initListeners () {
    for (var eventName in this._relations) {
      const soketResponse = event => response => {
        this._object[event](response)
      }
      this._gameSoket.on(this._relations[eventName], soketResponse(this._relations[eventName]))
    }
  }
}
