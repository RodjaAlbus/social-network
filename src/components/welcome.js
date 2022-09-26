import { onNavigate } from '../main.js'
import {
  auth, updateProfile, createUserWithEmailAndPassword, db, doc, collection, addDoc
} from '../importsFirebase.js'

export const Welcome = () => {
  const div = document.createElement('div')

  const title = document.createElement('h1')
  title.textContent = 'The prank Society'
  const paperEffect = document.createElement('div')
  paperEffect.id = 'paperH1'

  const section = document.createElement('section')
  section.className = 'createPrankster'

  const pranksterName = document.createElement('input')
  pranksterName.setAttribute('type', 'text')
  pranksterName.placeholder = 'Name your prankster'
  pranksterName.id = 'name'
  pranksterName.className = 'inputs'
  pranksterName.maxLength = 5
  //pranksterName.autocomplete = 'off'

  const canvas = document.createElement('canvas')
  canvas.width = 102
  canvas.height = 102
  const ctx = canvas.getContext('2d')
  const image = document.createElement('img')
  image.src = '../img/player/characters.png'
  image.onload = function () {
    canvas.style.backgroundColor = 'rgb(255,255,255)'
    canvas.style.border = '5px solid grey'
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(image, 16, -1, 16, 16, 0, 0, canvas.width, canvas.height)
  }

  const colorButtons = document.createElement('div')
  colorButtons.className = 'colorButtons'
  let theColorOfTheButton = 'blue'

  const btnBlue = document.createElement('button')
  btnBlue.id = 'blue'
  btnBlue.addEventListener('click', () => {
    theColorOfTheButton = '#80d1f9'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 16, 0, 16, 16, 0, 0, canvas.width, canvas.height)
  })
  const btnPink = document.createElement('button')
  btnPink.id = 'pink'
  btnPink.addEventListener('click', () => {
    theColorOfTheButton = '#f090d1'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 16, 16, 16, 16, 0, 0, canvas.width, canvas.height)
  })
  const btnOrange = document.createElement('button')
  btnOrange.id = 'orange'
  btnOrange.addEventListener('click', () => {
    theColorOfTheButton = '#ffa492'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 16, (16 * 2), 16, 16, 0, 0, canvas.width, canvas.height)
  })
  const btnYellow = document.createElement('button')
  btnYellow.id = 'yellow'
  btnYellow.addEventListener('click', () => {
    theColorOfTheButton = '#ffec9c'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 16, (16 * 3), 16, 16, 0, 0, canvas.width, canvas.height)
  })
  const btnGreen = document.createElement('button')
  btnGreen.id = 'green'
  btnGreen.addEventListener('click', () => {
    theColorOfTheButton = '#b7ff81'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 16, (16 * 4), 16, 16, 0, 0, canvas.width, canvas.height)
  })
  const btnPurple = document.createElement('button')
  btnPurple.id = 'purple'
  btnPurple.addEventListener('click', () => {
    theColorOfTheButton = '#b18aff'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 16, (16 * 5), 16, 16, 0, 0, canvas.width, canvas.height)
  })

  const email = document.createElement('input')
  email.setAttribute('type', 'text')
  email.placeholder = 'Email'
  email.id = 'email'
  email.className = 'inputs'
  //email.autocomplete = 'off'
  const password = document.createElement('input')
  password.setAttribute('type', 'text')
  password.placeholder = "Society's Passcode"
  password.id = 'password'
  password.className = 'inputs'
  //password.autocomplete = 'off'
  const alert = document.createElement('p')
  alert.id = 'alert'
  const btnEnter = document.createElement('button')
  btnEnter.textContent = 'Get In Looser :p'
  btnEnter.id = 'buttonEnter'
  btnEnter.className = 'buttons'
  btnEnter.addEventListener('click', () => {
    if (password.value && email.value && pranksterName.value) {
      createUserWithEmailAndPassword(auth, email.value.toLowerCase(), password.value)
        .then(() => {
          // Salvar los datos del usuario (Firebase Store)
          addDoc(collection(db, 'Pranksters'), {
            color: theColorOfTheButton,
            signInEmail: email.value.toLowerCase(),
            userID: auth.currentUser.uid
          })
            .then((data) => {
              console.log(data)
              //console.log(data._key.path.segments[1])
              onNavigate('/message')
            })
            .catch((e) => {
              alert(e.message)
            })
          updateProfile(auth.currentUser, {
            displayName: pranksterName.value
          })
        })
        .catch((error) => {
          // const errorCode = error.code;
          if (password.value.length <= 6 && password.value) {
            alert.textContent = 'Your password must have more than 6 characters'
          } else { alert.textContent = error.message }
        })
    } else { alert.textContent = 'Please complete all the fields' }
  })
  const btnReturningPrankster = document.createElement('button')
  btnReturningPrankster.textContent = 'Have a prankster already?'
  btnReturningPrankster.className = 'footer'
  btnReturningPrankster.addEventListener('click', () => onNavigate('/returningPrankster'))
  const footerPaperEffact = document.createElement('div')
  footerPaperEffact.id = 'footerPaper'

  colorButtons.append(btnBlue, btnPink, btnOrange, btnYellow, btnGreen, btnPurple)
  section.append(pranksterName, canvas, colorButtons, email, password, alert, btnEnter)
  div.append(paperEffect, title, section, footerPaperEffact, btnReturningPrankster)

  return div
}
