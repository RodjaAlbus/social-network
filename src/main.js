import { alreadyPrankster } from './components/alreadyPrankster.js'
import { playground } from './components/lobby.js'
import { message } from './components/PSMessage.js'
import { Welcome } from './components/welcome.js'

// Playable

import { InputHandler } from './Lobby/input.js'
import { Player } from './Lobby/Player.js'

const root = document.getElementById('root')
const routes = {
  '/': Welcome,
  '/returningPrankster': alreadyPrankster,
  '/message': message,
  '/playground': playground
}

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  root.removeChild(root.firstChild)
  root.appendChild(routes[pathname]())
}

window.onpopstate = () => {
  root.removeChild(root.firstChild)
  root.appendChild(component())
}

const component = routes[window.location.pathname]
root.appendChild(component())

const playerObj = document.getElementById('Player')
const gameArea = document.getElementById('gameArea')
const roomVertical = document.getElementById('roomVertical')
const roomHorizontal = document.getElementById('roomHorizontal')

const borders = []
window.addEventListener('keydown', ({ key }) => {
  if (key == 'q') {
    console.log(borders)
  }
})

class Game {
  constructor () {
    this.input = new InputHandler()
    this.player = new Player(gameArea, playerObj)
    this.#createRooms()
  }

  update () {
    this.player.update(this.input.keys, this.input.lastKey, borders)
  }

  #createRooms () {
    createRooms({ position: { top: '25%', left: '50%' }, direction: 'Vertical' })
    createRooms({ position: { top: '75%', left: '50%' }, direction: 'Vertical' })
    createRooms({ position: { top: '50%', left: '50%' }, direction: 'Horizontal' })
    createRooms({ position: { top: '50%', left: '25%' }, direction: 'Vertical' })
    createRooms({ position: { top: '50%', left: '75%' }, direction: 'Vertical' })
    createRooms({ position: { top: '90%', left: '90%' }, direction: 'Horizontal' })
    createRooms({ position: { top: '10%', left: '10%' }, direction: 'Horizontal' })
  }
}

const createRooms = ({ position, direction }) => {
  let roomClone
  if (direction == 'Horizontal') {
    roomClone = roomHorizontal.cloneNode(true)
  } else if (direction == 'Vertical') {
    roomClone = roomVertical.cloneNode(true)
  }
  roomClone.style.top = position.top
  roomClone.style.left = position.left
  borders.push(roomClone)
  gameArea.appendChild(roomClone)
  roomClone.style.display = 'block'
}

const game = new Game()

function animate (timeStamp) {
  game.update()
  requestAnimationFrame(animate)
}
animate(0)
