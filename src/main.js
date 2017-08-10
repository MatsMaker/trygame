import 'pixi'
import 'p2'
import Phaser from 'phaser'
import io from 'socket.io-client'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import AuthService from './services/auth'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super({
      width: width,
      height: height,
      renderer: Phaser.CANVAS,
      parent: 'content',
      state: null,
      transparent: false,
      antialias: true,
      physicsConfig: {}
    })

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)

    this.$ = {} // custom name space
    this.$.socket = io(config.socketHost)
    this.$.authService = new AuthService(this, this.$.socket, this)
    this.$.authService.auth()
  }

  newUser (response) {
    console.log('newUser:', response)
  }

  auth (response) {
    this.$.user = response
    this.state.start('Boot')
  }
}

window.game = new Game()
