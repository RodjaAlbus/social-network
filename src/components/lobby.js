import { auth, signOut, query, where, db, collection, getDocs } from "../importsFirebase.js";
import { onNavigate } from '../main.js'
import { InputHandler } from './Lobby/input.js'
import { Player } from './Lobby/Player.js'
import { theEmail } from "./welcome.js";
import { returningEmail } from "./alreadyPrankster.js";

export const playground = async () => {
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

  let emailMatcher;
  if (!theEmail) {
    emailMatcher = returningEmail
  } else {
    emailMatcher = theEmail
  }
  //Se puede uno solo?
  const pranksterRef = collection(db, 'Pranksters')
  const q = query(pranksterRef, where('signInEmail', '==', emailMatcher))
  const qSnap = await getDocs(q)
  qSnap.forEach(doc => {
    playerObj.style.backgroundColor = doc.data().color
    console.log(doc.id, " => ", doc.data())
  });

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
