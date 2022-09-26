import {
  auth, signOut, query, where, db, collection, getDocs, onSnapshot
} from "../importsFirebase.js";
import { onNavigate } from '../main.js'
import { InputHandler } from './Lobby/input.js'
import { Player } from './Lobby/Player.js'

//TEST
import { deleteDoc, addDoc, onAuthStateChanged, doc, database } from "../importsFirebase.js";
//TEST

export const playground = async () => {
  const div = document.createElement('div')

  const title = document.createElement('h1')
  title.textContent = 'The prank Society'
  const paperEffect = document.createElement('div')
  paperEffect.id = 'paperH1'

  const alert = document.createElement('p')
  alert.id = 'alert'

  //ADDING REMOVABLE COLLECTION TO STORE MOVEMENT----------------------
  //Se puede uno solo?
  const pranksterRef = collection(db, 'Pranksters')
  const query = query(pranksterRef, where('userID', '==', auth.currentUser.uid))
  const qSnap = await getDocs(query)
  addDoc(collection(db, 'PranksterMove'), {
    name: auth.currentUser.displayName,
    userID: auth.currentUser.uid,
    color: qSnap.doc[0].data().color,
    top: 195.22,
    left: 190.33
  })
    .then((user) => { console.log(user)})
    .catch((e) => { console.log(e) })

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
      deleteDoc()
    } 
  });

  //we have to remove from firestore
  //database.ref('PranksterMove/' + playerRef).onDisconnect().remove()

  //GAME PART---------------------------------------------------------
  const gameArea = document.getElementById('gameArea')
  const image = document.createElement('img')
  image.src = '../img/player/mapVer2.png'
  image.id = 'map'

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
        if (dataGeter.userID.stringValue === playerId) {
          newPlayer.className = "You" //Si eres tu, te pondra borde rojo
          gameStarter(newPlayer); //Luego te metera al juego
        } else {
          newPlayer.className = dataGeter.userID.stringValue
        }
        newPlayer.style.backgroundColor = dataGeter.color.stringValue
        newPlayer.style.top = dataGeter.top.doubleValue + 5 + "px"
        newPlayer.style.left = dataGeter.left.doubleValue + 8 + 'px'
        const playerName = document.createElement('p')
        playerName.id  = 'pranksterName'
        playerName.textContent = dataGeter.name.stringValue
        newPlayer.appendChild(playerName)
        gameArea.appendChild(newPlayer)
      }
      else if (change.type === 'modified') {
        const otherPlayers = document.getElementsByClassName(dataGeter.userID.stringValue)
        if (otherPlayers[0]) {
          otherPlayers[0].style.top = dataGeter.top.doubleValue + 5 + "px"
          otherPlayers[0].style.left = dataGeter.left.doubleValue + 8 + 'px'
        }
      }
      else if (change.type === 'removed') {
        const otherPlayer = document.getElementsByClassName(dataGeter.userID.stringValue)
        gameArea.remove(otherPlayer[0])
      }

      //console.log(doc.data().x, "   ", doc.data().x)
      console.log(change.type)
      //thePlayers.push(doc.data().playerId);
    });
    //console.log("Current players", thePlayers.join(", "));
  });
  gameArea.append(image, borderUp, borderLeft, borderRight, borderBottom)

  //write a message part
  //const footer =  document.createElement('footer')

  div.append(paperEffect, title, logOut, alert)
  return div
}

let playerId;
let playerRef = ;
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

const gameStarter = (playerObj) => {
  const currentPlayer = new Player(playerObj)
  const input = new InputHandler()

  function animate(timeStamp) {
    currentPlayer.update(input.keys, input.lastKey, borders, playerRef)
    requestAnimationFrame(animate)
  }
  animate(0)
}


