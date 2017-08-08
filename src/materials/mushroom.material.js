export default class MushroomMaterial {
  constructor (game, p2Body) {
    return game.physics.p2.createMaterial('mushroomMaterial', p2Body)
  }
}
