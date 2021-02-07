const socketio = require('socket.io')
const express = require('express')
const http = require('http')
const path = require('path')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.use(express.static(path.join(__dirname, '/public')))


io.on('connection', socket => {
  const botName = 'Bot'

  socket.on('joinRoom', ({ username, room}) => {
    const user = userJoin(socket.id, username, room)

    socket.join(user.room)

    socket.emit('message', formatMessage(`${botName}: `, ` ${ username }, Welcome to the chat `))
    socket.broadcast.to(user.room).emit('message', formatMessage('ChatCord bot: ', ` ${ username } joined to the chat`))

    // Send users number and room
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })

  })



  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id)

    io.to(user.room).emit('message', formatMessage(`${user.username} `, msg))


  })

  socket.on('disconnect', () => {
    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit('message', formatMessage( `${botName}: `, `${user.username} has left the chat`))

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    }

  })

})


server.listen(4000, () => console.log(`http://127.0.0.1:4000`))