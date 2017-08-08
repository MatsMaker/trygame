export default class WorldMaterial {
  constructor (game) {
    return game.physics.p2.createMaterial('worldMaterial')
  }
}
