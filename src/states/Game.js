import Phaser from 'phaser'
import MushroomsCollection from '../collections/mushrooms'
import ArmsCollection from '../collections/arms'
import WorldMaterial from '../materials/world.material'
import MushroomMaterial from '../materials/mushroom.material'
import RigidityContact from '../materials/rigidity.contact'
import InputService from '../services/input'

export default class Game extends Phaser.State {
  init () {
    this.game.stage.disableVisibilityChange = true
  }

  preload () {}

  create () {
    this._initSpace()
    this.$ = {} // custom name space

    this._text('Try game')

    this.$.armsCollection = new ArmsCollection(this.game, this.game.$.user)
    this.$.armsCollection.addItemOfOwner()
    this._initInput()

    this.$.mushroomsCollection = new MushroomsCollection(this.game, this.game.$.user)
    this.$.mushroomsCollection.addItemOfOwner()

    this.$.armsCollection.itemOfOwner.bodyOfinteraction.push(this.$.mushroomsCollection.itemOfOwner)

    this._intitObjects()
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.$.mushroomsCollection.itemOfOwner.sprite, 32, 32)
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
    this.$.worldMaterial = new WorldMaterial(this.game)
    this.game.physics.p2.setWorldMaterial(this.$.worldMaterial, true, true, true, true)
    this.$.mushroomMaterial = new MushroomMaterial(this.game, this.$.mushroomsCollection.itemOfOwner)
    this.$.contactMushroomAndWorkd = new RigidityContact(this.game, this.$.mushroomMaterial, this.$.worldMaterial)
  }

  _initInput () {
    this.$.inputService = new InputService(
      this.game,
      this.game.$.socket,
      this.$.armsCollection.itemOfOwner
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
