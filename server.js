const crypto = require('crypto')
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

const connections = []

io.on(protocols.base.connection, (socket) => {
  const token = crypto.randomBytes(64).toString('hex')
  connections.push(token)

  console.log('a user connected')
  socket.on(protocols.base.connection, () => {
    socket.emit(protocols.base.connection, {token})
  })

  for (var variable in protocols.inputEvents) {
    const soketResponse = eventName => data => {
      socket.emit(eventName, data)
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
