import Phaser from 'phaser'
import AbstractState from './abstract'
import io from 'socket.io-client'
import AuthService from '../services/auth'
import MushroomsCollection from '../collections/mushrooms'
import ArmsCollection from '../collections/arms'
import WorldMaterial from '../materials/world.material'
import MushroomMaterial from '../materials/mushroom.material'
import RigidityContact from '../materials/rigidity.contact'
import InputService from '../services/input'
import config from '../config'

export default class Game extends AbstractState {
  init () {
    this.game.stage.disableVisibilityChange = true
  }

  preload () {}

  create () {
    this.$.socket = io(config.socketHost)
    this.$.service.auth = new AuthService(this.game, this.$.socket, this)
    this.$.service.auth.auth()
  }

  newUser (response) {
    console.log('newUser:', response)
  }

  auth (response) {
    this.$.user = response
    this.startGame()
  }

  startGame () {
    this._initSpace()

    this._text('Try game')

    this.$.collection.arms = new ArmsCollection(this.game, this.$.user)
    this.$.collection.arms.addItemOfOwner()
    this._initInput()

    this.$.collection.mushrooms = new MushroomsCollection(this.game, this.$.user)
    this.$.collection.mushrooms.addItemOfOwner()

    this.$.collection.arms.itemOfOwner.bodyOfinteraction.push(this.$.collection.mushrooms.itemOfOwner)

    this._intitObjects()
  }

  render () {
    if (__DEV__ && this.$.user) {
      this.game.debug.spriteInfo(this.$.collection.mushrooms.itemOfOwner.sprite, 32, 32)
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
    this.$.mushroomMaterial = new MushroomMaterial(this.game, this.$.collection.mushrooms.itemOfOwner)
    this.$.contactMushroomAndWorkd = new RigidityContact(this.game, this.$.mushroomMaterial, this.$.worldMaterial)
  }

  _initInput () {
    this.$.inputService = new InputService(
      this.game,
      this.$.socket,
      this.$.collection.arms.itemOfOwner
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
