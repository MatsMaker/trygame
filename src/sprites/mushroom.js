import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (...argm) {
    super(...argm)
    this.anchor.setTo(0.5)
  }
}
