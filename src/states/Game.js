import Phaser from 'phaser'
import MushroomObject from '../objects/mushroom'
import ArmPointer from '../arm'

export default class Game extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this._initSpace()
    this.$ = {} // custom name space
    this.$.armPointer = new ArmPointer(this.game)

    this._text('Phaser + ES6 + Webpack')

    this._addMushroom()

    this.$.armPointer.bodyOfinteraction.push(this.$.mushroom)
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.$.mushroom, 32, 32)
    // }
  }

  update () {
    // this.mushroom.body.angle += 1
  }

  _initSpace () {
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.physics.p2.gravity.y = 1200
  }

  _addMushroom () {
    this.$.mushroom = new MushroomObject(
      this.game,
      null,
      this.world.centerX,
      this.world.centerY
    )
  }

  _text (bannerText) {
    this.banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    this.banner.font = 'Bangers'
    this.banner.padding.set(10, 16)
    this.banner.fontSize = 40
    this.banner.fill = '#77BFA3'
    this.banner.smoothed = false
    this.banner.anchor.setTo(0.5)
  }
}
