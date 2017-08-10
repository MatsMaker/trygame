import AbstractCollection from './abstract'
import ArmPointer from '../bodys/arm'

export default class ArmsCollection extends AbstractCollection {
  constructor (game, owner) {
    super(game, owner, ArmPointer)
  }

  addItemOfOwner () {
    super.addItemOfOwner(this._game, this._owner)
  }
}
