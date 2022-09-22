import { auth, signOut, getDoc } from "../importsFirebase.js";
import { onNavigate } from '../main.js'
import { InputHandler } from './Lobby/input.js'
import { Player } from './Lobby/Player.js'

export const playground = () => {
  const div = document.createElement('div')

  const title = document.createElement('h1')
  title.textContent = 'The prank Society'
  const paperEffect = document.createElement('div')
  paperEffect.id = 'paperH1'

  const alert = document.createElement('p')
  alert.id = 'alert'

  //close sesion part
  const logOut = document.createElement('div')
  logOut.id = 'logOutBtn'
  logOut.addEventListener('click', () => {
    signOut(auth).then(() => {
      onNavigate('/')
    }).catch((e) => {
      alert.textContent = e.message
    });
  })
  const logOutImg = document.createElement('img')
  logOutImg.src = '../img/outBtn.png'
  logOutImg.id = 'logOutImg'

  logOut.append(logOutImg)

  //game part
  const gameArea = document.getElementById('gameArea')
  const image = document.createElement('img')
  image.src = '../img/player/mapVer2.png'
  image.id = 'map'
  const playerObj = document.createElement('div')
  playerObj.id = "Player"
  const pranksterName = document.createElement('p')
  pranksterName.id = 'pranksterName'
  pranksterName.textContent = auth.currentUser.displayName

  playerObj.appendChild(pranksterName)


  //BORDERS
  const borderUp = document.createElement('div')
  borderUp.id = 'brdrUp'
  const borderLeft = document.createElement('div')
  borderLeft.id = 'brdrLeft'
  const borderRight = document.createElement('div')
  borderRight.id = 'brdrRight'

  const borders = [
    borderUp, borderLeft, borderRight
  ]

  gameArea.append(image, playerObj, borderUp, borderLeft, borderRight)
  class Game {
    constructor() {
      this.input = new InputHandler()
      this.player = new Player(playerObj)
    }

    update() {
      this.player.update(this.input.keys, this.input.lastKey, borders)
    }

  }
  const gameCreator = new Game()

  function animate(timeStamp) {
    gameCreator.update()
    requestAnimationFrame(animate)
  }
  animate(0)

  //write a message part
  //const footer =  document.createElement('footer')

  div.append(paperEffect, title, logOut, alert)
  return div
}
