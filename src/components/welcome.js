import { onNavigate } from "../main.js"

export const Welcome = () => {
    const div = document.createElement('div')

    const title = document.createElement('h1')
    title.textContent = 'The prank Society'

    const section = document.createElement('section')
    section.className = 'createPrankster'

    const pranksterName = document.createElement('input')
    pranksterName.setAttribute('type', 'text')
    pranksterName.placeholder = "Name your prankster"
    pranksterName.id = 'name'
    pranksterName.className = 'inputs'

    const canvas = document.createElement('canvas')
    canvas.width = 102
    canvas.height = 102
    const ctx = canvas.getContext('2d')
    const image = document.createElement('img')
    image.src = '../img/player/characters.png'
    image.onload = function () {
        canvas.style.backgroundColor = "rgb(255,255,255)"
        canvas.style.border = "5px solid grey"
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(image, 16, -1, 16, 16, 0, 0, canvas.width, canvas.height)
    }

    const colorButtons = document.createElement('div')
    colorButtons.className = 'colorButtons'

    const btnBlue = document.createElement('button')
    btnBlue.id = 'blue'
    btnBlue.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 16, 0, 16, 16, 0, 0, canvas.width, canvas.height)
    })
    const btnPink = document.createElement('button')
    btnPink.id = 'pink'
    btnPink.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 16, 16, 16, 16, 0, 0, canvas.width, canvas.height)
    })
    const btnOrange = document.createElement('button')
    btnOrange.id = 'orange'
    btnOrange.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 16, (16*2), 16, 16, 0, 0, canvas.width, canvas.height)
    })
    const btnYellow = document.createElement('button')
    btnYellow.id = 'yellow'
    btnYellow.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 16, (16*3), 16, 16, 0, 0, canvas.width, canvas.height)
    })
    const btnGreen = document.createElement('button')
    btnGreen.id = 'green'
    btnGreen.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 16, (16*4), 16, 16, 0, 0, canvas.width, canvas.height)
    })
    const btnPurple = document.createElement('button')
    btnPurple.id = 'purple'
    btnPurple.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 16, (16*5), 16, 16, 0, 0, canvas.width, canvas.height)
    })

    const email = document.createElement('input')
    email.setAttribute('type', 'text')
    email.placeholder = "Email"
    email.id = 'email'
    email.className = 'inputs'
    const password = document.createElement('input')
    password.setAttribute('type', 'text')
    password.placeholder = "Society's Passcode"
    password.id = 'password'
    password.className = 'inputs'
    const btnEnter = document.createElement('button')
    btnEnter.textContent = 'Get In Looser :p'
    btnEnter.className = 'buttons'
    btnEnter.addEventListener('click', () => onNavigate('/playground')) //Aun no primero al mensaje

    const btnReturningPrankster = document.createElement('button')
    btnReturningPrankster.textContent = 'Have a prankster already?'
    btnReturningPrankster.className = 'footer'
    btnReturningPrankster.addEventListener('click', () => onNavigate('/returningPrankster'))

    colorButtons.append(btnBlue, btnPink, btnOrange, btnYellow, btnGreen, btnPurple);
    section.append(pranksterName, canvas, colorButtons, email, password, btnEnter);
    div.append(title, section, btnReturningPrankster)

    return div
}