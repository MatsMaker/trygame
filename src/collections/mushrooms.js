import AbstractCollection from './abstract'
import MushroomObject from '../objects/mushroom'

export default class Mushrooms extends AbstractCollection {
  constructor (game, owner) {
    super(game, owner, MushroomObject)
  }

  addItemOfOwner (x, y) {
    const posX = x || this._game.world.centerX
    const posY = y || this._game.world.centerY
    super.addItemOfOwner(
      this._game,
      null,
      posX,
      posY
    )
  }
}
