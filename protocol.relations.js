const inputEvents = {
  onDown: 'click',
  onUp: 'release',
  move: 'move'
}

const base = {
  connection: 'connection',
  disconnect: 'disconnect'
}

const session = {
  auth: 'auth',
  newUser: 'newUser'
}

const mushroom = {
  new: 'new',
  move: 'move',
  remove: 'remove'
}

module.exports = {
  base,
  session,
  mushroom,
  inputEvents
}
