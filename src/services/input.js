import AbstractService from './abstract'
import {inputEvents} from '../../protocol.relations'

export default class InputService extends AbstractService {
  constructor (game, gameSoket, object, relations = inputEvents) {
    super(game, gameSoket, object, relations)

    this._game.input.onDown.add(this._observer(this._relations.onDown), this._object)
    this._game.input.onUp.add(this._observer(this._relations.onUp), this._object)
    this._game.input.addMoveCallback(this._observer(this._relations.move), this._object)
  }

  _observer (observer) {
    return (pointer) => {
      const data = {
        position: {
          x: pointer.position.x,
          y: pointer.position.y
        }}
      this._gameSoket.emit(observer, data)
    }
  }
}
