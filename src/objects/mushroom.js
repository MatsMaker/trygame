import Phaser from 'phaser'
import Mushroom from '../sprites/mushroom'

export default class MushroomObject extends Phaser.Physics.P2.Body {
  constructor (game, preSprite, x, y, mass) {
    const spriteOfObj = preSprite || new Mushroom(
      game,
      x,
      y,
      'mushroom'
    )
    game.add.existing(spriteOfObj)
    super(game, spriteOfObj, x, y, mass)
    spriteOfObj.body = this
    this.mass = mass || 1700
    this.debug = __DEV__

    this.game.physics.p2.enable(this)
  }
}
