const socketio = require('socket.io')
const express = require('express')
const http = require('http')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.use(express.static(path.join(__dirname, '/public')))


io.on('connection', socket => {

  socket.emit('message', 'a new user joined to the chat')

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat')
  })

  socket.on('chatMessage', (msg) => {
    io.emit('message', msg)
  })

})


server.listen(4000, () => console.log(`http://127.0.0.1:4000`))