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

  //TEST
  signInAnonymously(auth)
    // signInWithEmailAndPassword(auth, 'rosalbamusician@gmail.com', '12341234')
    .then(() => {
      playerId = auth.currentUser.uid
      addDoc(collection(db, 'PranksterMove'), {
        y: 0,
        x: 50,
        userID: playerId,
        direction: 'right'
      })
        .then((data) => {
          playerRef = doc(db, 'PranksterMove', data._key.path.segments[1])
          console.log('data:', data._key.path.segments[1])
        })
        .catch((e) => {
          alert(e.message)
        })
      const testGameObject = document.createElement('div')
      testGameObject.id = 'Player'
      document.getElementById('gameArea').appendChild(testGameObject)

      const currentPlayer = new Player(testGameObject)
      const input = new InputHandler()

      function animate(timeStamp) {
        currentPlayer.update(input.keys, input.lastKey, borders, playerRef)
        requestAnimationFrame(animate)
      }
      animate(0)
    })
  //database.ref('PranksterMove/' + playerRef).onDisconnect().remove()

  onSnapshot(collection(db, 'PranksterMove'), (doc) => {
    const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " data: ", doc._snapshot.docChanges);
    if(doc._snapshot.docChanges == {0: {type:2, doc:'Fi'}})
    {
      console.log('create')
    } else {console.log('update')}
    //gameStarter()
    //how to trigger only on document add
    //trigger only on values change
  })

  //TEST

  //write a message part
  //const footer =  document.createElement('footer')

  div.append(paperEffect, title, logOut, alert)
  return div
}

let playerId;
let playerRef;

const gameStarter = async () => {
  const allPlayersRef = await getDocs(collection(db, "PranksterMove"));
  allPlayersRef.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

