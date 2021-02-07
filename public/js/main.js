const socket = io()
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.querySelector('#room-name')
const userList = document.querySelector('#users')

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})


socket.emit('joinRoom', { username, room })

//get room and users
socket.on('roomUsers', ({ room, users}) => {
  outPutRoomName(room)
  outPutUsers(users)
})


socket.on('message', message => {
  outPutMessage(message)

  chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', (evt) => {
  evt.preventDefault()


  const msg = evt.target.elements.msg.value

  socket.emit('chatMessage', msg)

  evt.target.elements.msg.value = ''
  evt.target.elements.msg.focus()
})

function outPutMessage(msg) {
  const div = document.createElement('div')
  div.classList.add('message')

  console.log(msg)

  div.innerHTML = `<p class="meta">${msg.username}<span>${msg.time}</span></p>
  <p class="text">${msg.text}</p>`

  document.querySelector('.chat-messages').appendChild(div)
}

// Add roomname to DOM

function outPutRoomName(room) {
  roomName.innerText = room
}

// Add users to DOM

function outPutUsers(users) {
  userList.innerHTML= `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `
}