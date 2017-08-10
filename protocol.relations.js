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

module.exports = {
  base,
  session,
  inputEvents
}
