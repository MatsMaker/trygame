// import Phaser from 'phaser'
// extends Phaser.Physics.P2.ContactMaterial

export default class RigidityContact {
  constructor (game, materialA, materialB) {
    const contactMaterial = game.physics.p2.createContactMaterial(materialA, materialB)

    contactMaterial.friction = 0.9 // Friction to use in the contact of these two materials.
    contactMaterial.restitution = 0 // 1.0 // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
    contactMaterial.stiffness = 1e7 // (487x16) // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
    contactMaterial.relaxation = 3 // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
    contactMaterial.frictionStiffness = 1e7 // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
    contactMaterial.frictionRelaxation = 3 // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
    contactMaterial.surfaceVelocity = 0 // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.

    return contactMaterial
  }
}
