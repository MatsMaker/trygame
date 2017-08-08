import Phaser from 'phaser'
import MushroomObject from '../objects/mushroom'
import ArmPointer from '../bodys/arm'
import WorldMaterial from '../materials/world.material'
import MushroomMaterial from '../materials/mushroom.material'
import RigidityContact from '../materials/rigidity.contact'

export default class Game extends Phaser.State {
  init () {
    this.game.stage.disableVisibilityChange = true
  }

  preload () {}

  create () {
    this._initSpace()
    this.$ = {} // custom name space

    this._text('Phaser + ES6 + Webpack')

    this.$.mushroom = new MushroomObject(
      this.game,
      null,
      this.world.centerX,
      this.world.centerY
    )

    this.$.armPointer = new ArmPointer(this.game)
    this.$.armPointer.bodyOfinteraction.push(this.$.mushroom)

    this.$.worldMaterial = new WorldMaterial(this.game)
    this.game.physics.p2.setWorldMaterial(this.$.worldMaterial, true, true, true, true)
    this.$.mushroomMaterial = new MushroomMaterial(this.game, this.$.mushroom)
    this.$.contactMushroomAndWorkd = new RigidityContact(this.game, this.$.mushroomMaterial, this.$.worldMaterial)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.$.mushroom.sprite, 32, 32)
    }
  }

  update () {
    // this.mushroom.body.angle += 1
  }

  _initSpace () {
    //  Enable p2 physics
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.physics.p2.gravity.y = 1000
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
