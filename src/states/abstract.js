import Phaser from 'phaser'

export default class AbstractState extends Phaser.State {
  constructor (game, ...arg) {
    if (new.target === AbstractState) {
      throw new TypeError('Cannot construct AbstractState instances directly')
    }

    super(game, ...arg)
    this.$ = game.$ // custom name space
    this.$[new.target] = this
  }
}
