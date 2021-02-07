const socket = io()
const chatForm = document.getElementById('chat-form')

socket.on('message', message => {
  console.log(message)
  outPutMessage(message)
})

chatForm.addEventListener('submit', (evt) => {
  evt.preventDefault()


  const msg = evt.target.elements.msg.value

  socket.emit('chatMessage', msg)
})

function outPutMessage(msg) {
  const div = document.createElement('div')
  div.classList.add('message')

  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">${msg}</p>`

  document.querySelector('.chat-messages').appendChild(div)
}