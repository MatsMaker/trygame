const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const protocols = require('./protocol.relations')

const APP_PORT = 8080
const DIST_DIR = path.join(__dirname, 'dist')

app.get('/', function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

io.on(protocols.base.connection, (socket) => {
  console.log('a user connected: ', socket.id)
  io.emit(protocols.session.newUser, {id: socket.id})

  socket.on(protocols.session.auth, () => {
    socket.emit(protocols.session.auth, {id: socket.id})
  })

  for (var variable in protocols.inputEvents) {
    const soketResponse = eventName => data => {
      io.emit(eventName, data)
    }
    socket.on(protocols.inputEvents[variable], soketResponse(protocols.inputEvents[variable]))
  }

  socket.on(protocols.base.disconnect, () => {
    console.log('user disconnected')
  })
})

http.listen(APP_PORT, () => {
  console.log(`listening on *:${APP_PORT}`)
})
