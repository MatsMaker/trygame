import Phaser from 'phaser'

export default class ArmPointer extends Phaser.Physics.P2.Body {
  constructor (...argm) {
    super(...argm)
    this.bodyOfinteraction = []
    this.holds = null
    this.game.physics.p2.addBody(this)

    this.debug = __DEV__
    this.static = true
    this.mass = 0

    // attach pointer events
    this.game.input.onDown.add(this.click, this)
    this.game.input.onUp.add(this.release, this)
    this.game.input.addMoveCallback(this.move, this)
  }

  click (pointer) {
    const bodies = this.game.physics.p2.hitTest(pointer.position, this.bodyOfinteraction)
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    const physicsPos = [
      this.game.physics.p2.pxmi(pointer.position.x),
      this.game.physics.p2.pxmi(pointer.position.y)
    ]
    if (bodies.length) {
      const clickedBody = bodies[0]

      const localPointInBody = [0, 0]
      // this function takes physicsPos and coverts it to the body's local coordinate system
      clickedBody.toLocalFrame(localPointInBody, physicsPos)

      // use a revoluteContraint to attach mouseBody to the clicked body
      this.holds = this.game.physics.p2.createRevoluteConstraint(
        this,
        [0, 0],
        clickedBody,
        [
          this.game.physics.p2.mpxi(localPointInBody[0]),
          this.game.physics.p2.mpxi(localPointInBody[1])
        ]
      )
    }
  }

  release () {
    // remove constraint from object's body
    this.game.physics.p2.removeConstraint(this.holds)
  }

  move (pointer) {
    // p2 uses different coordinate system, so convert the pointer position to p2's coordinate system
    // this.game.physics.p2.pxmi
    this.x = pointer.position.x
    this.y = pointer.position.y
  }
}
