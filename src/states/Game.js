import Phaser from 'phaser'
import MushroomObject from '../objects/mushroom'
import ArmPointer from '../bodys/arm'
import WorldMaterial from '../materials/world.material'
import MushroomMaterial from '../materials/mushroom.material'
import RigidityContact from '../materials/rigidity.contact'
import InputService from '../services/input'
import protocols from '../../protocols'

export default class Game extends Phaser.State {
  init () {
    this.game.stage.disableVisibilityChange = true
  }

  preload () {}

  create () {
    this._initSpace()
    this.$ = {} // custom name space

    this._text('Phaser + ES6 + Webpack')
    this._intitObjects()
    this._initArm()
    this.$.armPointer.bodyOfinteraction.push(this.$.mushroom)
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

  _intitObjects () {
    this.$.mushroom = new MushroomObject(
      this.game,
      null,
      this.world.centerX,
      this.world.centerY
    )
    this.$.mushroom2 = new MushroomObject(
      this.game,
      null,
      this.world.centerX,
      this.world.centerY
    )
    this.$.worldMaterial = new WorldMaterial(this.game)
    this.game.physics.p2.setWorldMaterial(this.$.worldMaterial, true, true, true, true)
    this.$.mushroomMaterial = new MushroomMaterial(this.game, this.$.mushroom)
    this.$.contactMushroomAndWorkd = new RigidityContact(this.game, this.$.mushroomMaterial, this.$.worldMaterial)
  }

  _initArm () {
    this.$.armPointer = new ArmPointer(this.game)
    // attach pointer events
    // this.game.input.onDown.add(this.$.armPointer.click, this.$.armPointer)
    // this.game.input.onUp.add(this.$.armPointer.release, this.$.armPointer)
    // this.game.input.addMoveCallback(this.$.armPointer.move, this.$.armPointer)
    this.$.inputService = new InputService(
      this.game,
      this.game.$.socket,
      this.$.armPointer,
      protocols.inputEvents
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
