import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import BaseService from '../services/base'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')

    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('pointer', 'assets/images/pointer.png')
  }

  create () {
    this.$ = {}

    this.$.baseService = new BaseService(this.game, this.game.$.socketStream$, this)
    this.$.baseService.connection()
  }

  connection () {
    this._startGame()
  }

  _startGame () {
    this.state.start('Game')
  }
}
