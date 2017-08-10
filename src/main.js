import 'pixi'
import 'p2'
import Phaser from 'phaser'
// import io from 'socket.io-client'
import Rx from 'rxjs/Rx'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

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

    this.state.start('Boot')

    this.$ = {} // custom name space
    this.$.socketStream$ = Rx.Observable.webSocket(config.socketHost)
    // this.$.socketStream$.subscribe(
    //   {
    //     next: (request) => {
    //       console.log(request)
    //     },
    //     error: (err) => console.warn(err),
    //     complete: () => {}
    //   }
    // )
    // this.$.socket = io(config.socketHost)
  }
}

window.game = new Game()
