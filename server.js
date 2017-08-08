const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const protocols = require('./protocols')

const APP_PORT = 8080
const DIST_DIR = path.join(__dirname, 'dist')

app.get('/', function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected')
  for (var variable in protocols.inputEvents) {
    const soketResponse = eventName => data => {
      socket.emit(eventName, data)
    }
    socket.on(protocols.inputEvents[variable], soketResponse(protocols.inputEvents[variable]))
  }

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(APP_PORT, () => {
  console.log(`listening on *:${APP_PORT}`)
})
