import AbstractService from './abstract'
import { centerGameObjects } from '../utils'
// import BaseService from '../services/base'

export default class extends AbstractService {
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
    this.state.start('Game')
  }
}
