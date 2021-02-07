const socketio = require('socket.io')
const express = require('express')
const http = require('http')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.use(express.static(path.join(__dirname, '/public')))


io.on('connection', client => {

  console.log('New connection')
})


server.listen(4000, () => console.log(`http://127.0.0.1:4000`))