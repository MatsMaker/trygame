export default class InputService {
  constructor (game, gameSoket, object, relations) {
    this.game = game
    this.gameSoket = gameSoket
    this.object = object
    this.relations = relations

    this.game.input.onDown.add(this._observer(this.relations.onDown), this.object)
    this.game.input.onUp.add(this._observer(this.relations.onUp), this.object)
    this.game.input.addMoveCallback(this._observer(this.relations.move), this.object)

    this._initListeners()
  }

  _observer (observer) {
    return (pointer) => {
      const data = JSON.stringify({
        position: {
          x: pointer.position.x,
          y: pointer.position.y
        }})
      this.gameSoket.emit(observer, data)
    }
  }

  _initListeners () {
    for (var eventName in this.relations) {
      const soketResponse = event => pointerData => {
        const pointer = JSON.parse(pointerData)
        this.object[event](pointer)
      }
      this.gameSoket.on(this.relations[eventName], soketResponse(this.relations[eventName]))
    }
  }
}
