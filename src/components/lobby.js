import {
  auth, signOut, query, where, db, collection, getDocs, onSnapshot
} from "../importsFirebase.js";
import { onNavigate } from '../main.js'
import { InputHandler } from './Lobby/input.js'
import { Player } from './Lobby/Player.js'
import { theEmail } from "./welcome.js";
import { returningEmail } from "./alreadyPrankster.js";

//TEST
import { signInWithEmailAndPassword, signInAnonymously, addDoc, onAuthStateChanged, doc, database } from "../importsFirebase.js";
//TEST

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
  pranksterName.textContent = /*auth.currentUser.displayName*/ 'roxy'

  //Comented Bcos TEST
  /*let emailMatcher;
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
  })*/

  playerObj.appendChild(pranksterName)

  //BORDERS


  gameArea.append(image, playerObj, borderUp, borderLeft, borderRight, borderBottom)

  //TEST
  signInAnonymously(auth)
    // signInWithEmailAndPassword(auth, 'rosalbamusician@gmail.com', '12341234')
    .then(() => {
      playerId = auth.currentUser.uid
      addDoc(collection(db, 'PranksterMove'), {
        top: 20.22,
        left: 30.33,
        userID: playerId,
        color: '#b18aff'
      })
        .then((data) => {
          playerRef = doc(db, 'PranksterMove', data._key.path.segments[1])
          console.log('data:', data._key.path.segments[1])
        })
        .catch((e) => {
          alert(e.message)
        })

    })
  //database.ref('PranksterMove/' + playerRef).onDisconnect().remove()

  /*onSnapshot(collection(db, 'PranksterMove'), (doc) => {
    const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " data: ", doc._snapshot.docChanges);
    if(doc._snapshot.docChanges == {0: {type:2, doc:'Fi'}})
    {
      console.log('create')
    } else {console.log('update')}
    //gameStarter()
    //how to trigger only on document add
    //trigger only on values change
  }) */

  const q = query(collection(db, "PranksterMove"));
  const allPlayers = onSnapshot(q, (querySnapshot) => {
    const thePlayers = [];
    //console.log(querySnapshot)
    querySnapshot.docChanges().forEach((change) => {
      //console.log(change)
      const dataGeter = change.doc._document.data.value.mapValue.fields
      if (change.type === "added") {
        const newPlayer = document.createElement('div')
        newPlayer.id = 'Player'
        if (dataGeter.userID.stringValue === playerId) {
          newPlayer.className = "You"
          gameStarter(newPlayer);
        } else {
          newPlayer.style.backgroundColor = dataGeter.color.stringValue
          newPlayer.className = dataGeter.userID.stringValue
        }
        newPlayer.style.top = dataGeter.top.doubleValue + 5 + "px"
        newPlayer.style.left = dataGeter.left.doubleValue + 8 + 'px'
        const playerName = document.createElement('p')
        playerName.textContent = dataGeter.userID.stringValue
        newPlayer.appendChild(playerName)
        //console.log(change.doc._document.data.value.mapValue.fields.userID)
        gameArea.appendChild(newPlayer)
      }
      else if (change.type === 'modified') {
        const otherPlayers = document.getElementsByClassName(dataGeter.userID.stringValue)
        if (otherPlayers[0]) {
          otherPlayers[0].style.top = change.doc._document.data.value.mapValue.fields.top.doubleValue + 5 + "px"
          otherPlayers[0].style.left = change.doc._document.data.value.mapValue.fields.left.doubleValue + 8 + 'px'
          console.log(otherPlayers)
        }
      }

      //console.log(doc.data().x, "   ", doc.data().x)
      console.log(change.type)
      //thePlayers.push(doc.data().playerId);
    });
    //console.log("Current players", thePlayers.join(", "));
  });

  //TEST

  //write a message part
  //const footer =  document.createElement('footer')

  div.append(paperEffect, title, logOut, alert)
  return div
}

let playerId;
let playerRef;
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

const nonow = async () => {
  const allPlayersRef = await getDocs(collection(db, "PranksterMove"));
  allPlayersRef.forEach((doc) => {
    onSnapshot(doc(db, 'PranksterMove', doc), (doc) => {
      console.log(doc.data());
    })
  });
}

