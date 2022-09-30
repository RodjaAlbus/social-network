import {
  auth, signOut, query, where, db, collection, getDocs, onSnapshot,
  deleteDoc, addDoc, onAuthStateChanged, doc, getDoc, setDoc
} from "../importsFirebase.js";
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

  //CLOSE SESION PART-------------------------------------------------
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

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      deleteDoc(playerRef)
        .then((data) => { console.log('signOut:', data) })
        .catch((e) => { console.log('error singing out: ', e) })
    }
  });

  //we have to remove from firestore
  //database.ref('PranksterMove/' + playerRef).onDisconnect().remove()

  //ADDING REMOVABLE COLLECTION TO STORE MOVEMENT----------------------
  const playerRef = doc(db, 'PranksterMove', auth.currentUser.uid)
  getDoc(doc(db, "Pranksters", auth.currentUser.uid))
    .then((data) => {
      console.log('data: ', data.data()) //getDoc si arroja la data
      setDoc((playerRef), { //Recordar usar el nombre correcto de la coleccion
        name: auth.currentUser.displayName,
        userID: auth.currentUser.uid,
        color: data.data().color,
        top: 353.5,
        left: 173.5
      })
        .then(() => console.log('removable movement doc, created'))
        .catch((e) => console.log('error creating movement doc: ', e))
    })
    .catch((e) => console.log('error: ', e))

  //GAME PART---------------------------------------------------------
  const gameArea = document.getElementById('gameArea')
  const image = document.createElement('img')
  image.src = '../img/player/mapVer2.png'
  image.id = 'map'

  const borderUp = document.createElement('div')
  borderUp.id = 'brdrUp'
  const borderLeft = document.createElement('div')
  borderLeft.id = 'brdrLeft'
  const borderRight = document.createElement('div')
  borderRight.id = 'brdrRight'
  const borderBottom = document.createElement('div')
  borderBottom.id = 'brdrBottom'

  const borders = [
    borderUp, borderLeft, borderRight, borderBottom
  ]

  //INTEGRATING PLAYERS------------------------------------------------
  const q = query(collection(db, 'PranksterMove'))
  const allPlayers = onSnapshot(q, (querySnapshot) => {
    //console.log('querySnapshot: ', querySnapshot)
    querySnapshot.docChanges().forEach((change) => {
      //console.log('change: ', change.type)
      if (change.type === "added") {
        const newPlayer = document.createElement('div')
        newPlayer.className = 'Player'
        

        
      }
    })
  })

  /*
    //INTEGRATING PLAYERS------------------------------------------------
    const q = query(collection(db, "PranksterMove"));
    const allPlayers = onSnapshot(q, (querySnapshot) => {
      //console.log(querySnapshot)
      querySnapshot.docChanges().forEach((change) => {
        //console.log(change)
        const dataGeter = change.doc._document.data.value.mapValue.fields
        if (change.type === "added") { //Si hay documentos en firestore o se añaden más
          const newPlayer = document.createElement('div') //crearelobjeto del jugador
          newPlayer.id = 'Player'
          if (dataGeter.userID.stringValue === auth.currentUser.uid) {
            newPlayer.className = "You" //Si eres tu, te pondra borde rojo
            currentPlayer = new Player(newPlayer)
          } else {
            newPlayer.className = dataGeter.userID.stringValue
          }
          newPlayer.style.backgroundColor = dataGeter.color.stringValue
          newPlayer.style.top = dataGeter.top.doubleValue + "px"
          newPlayer.style.left = dataGeter.left.doubleValue + 'px'
          const playerName = document.createElement('p')
         // playerName.id = 'pranksterName'
          playerName.textContent = dataGeter.name.stringValue
          newPlayer.appendChild(playerName)
          gameArea.appendChild(newPlayer)
        }
        else if (change.type === 'modified') {
          const otherPlayers = document.getElementsByClassName(dataGeter.userID.stringValue)
          if (otherPlayers[0]) {
            otherPlayers[0].style.top = dataGeter.top.doubleValue + "px"
            otherPlayers[0].style.left = dataGeter.left.doubleValue + 'px'
            console.log('left: ', dataGeter.left.doubleValue)
            console.log('dataGeter: ', dataGeter)
          }
        }
        else if (change.type === 'removed') {
          console.log('REMOVED SOONNN')
          const otherPlayer = document.getElementsByClassName(dataGeter.userID.stringValue)
          console.log(otherPlayer)
          otherPlayer[0].remove()
        }
        console.log(change.type)
      });
    });
  */

  gameArea.append(image, borderUp, borderLeft, borderRight, borderBottom)

  //BUTTONS PART-------------------------------------------------------------------------
  const footerPaperEffact = document.createElement('footer')
  footerPaperEffact.id = 'extendedFooterPaper'
  const footer = document.createElement('footer')
  footer.className = 'extendedFooter'

  const innerText = document.createElement('h3')
  innerText.textContent = "Move your prankster"

  //TESTING PURPOSES
  /*const playerObj = document.createElement('div')
  playerObj.id = "Player"
  playerObj.className = 'You'
  gameArea.appendChild(playerObj)*/
  //TESTING PURPOSES

  let currentPlayer

  const buttonUpContainr = document.createElement('div')
  buttonUpContainr.id = 'btnUpContainer'
  const buttonUp = document.createElement('button')
  buttonUp.id = 'btnUp'
  buttonUp.addEventListener('click', () => {
    if (window.location.pathname === '/playground') {
      currentPlayer.update('up', borders, postsDoor, playerRef)
    }
  })
  buttonUp.textContent = '^'
  const buttons = document.createElement('div')
  buttons.id = 'movementButtons'
  const buttonDown = document.createElement('button')
  buttonDown.id = 'btnDown'
  buttonDown.textContent = 'v'
  buttonDown.addEventListener('click', () => {
    if (window.location.pathname === '/playground') {
      currentPlayer.update('down', borders, postsDoor, playerRef)
    }
  })
  const buttonLeft = document.createElement('button')
  buttonLeft.id = 'btnLeft'
  buttonLeft.textContent = '<'
  buttonLeft.addEventListener('click', () => {
    if (window.location.pathname === '/playground') {
      currentPlayer.update('right', borders, postsDoor, playerRef)
    }
  })
  const buttonRight = document.createElement('button')
  buttonRight.id = 'btnRight'
  buttonRight.textContent = '>'
  buttonRight.addEventListener('click', () => {
    if (window.location.pathname === '/playground') {
      currentPlayer.update('left', borders, postsDoor, playerRef)
    }
  })

  buttonUpContainr.appendChild(buttonUp)
  buttons.append(buttonLeft, buttonDown, buttonRight)

  footer.append(innerText, buttonUpContainr, buttons)

  //DOORS PART----------------------------------------------------------------------------------------
  const postsDoor = document.createElement('div')
  postsDoor.id = 'postsDoor'

  gameArea.append(postsDoor)

  //SHOW POST TOLD--------------------------------------------------------------------------
  /**/

  div.append(paperEffect, title, logOut, alert, footerPaperEffact, footer)
  return div
}


