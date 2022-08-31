import { onNavigate } from "../main.js"

export const Welcome = () => {
    const div = document.createElement('div')
    div.className = "Welcome"
    const title = document.createElement('h2')

    const btnReturningPrankster = document.createElement('button')
    const pranksterName = document.createElement('input')
    const email = document.createElement('input')
    const password = document.createElement('input')
    const btnEnter = document.createElement('button')


    pranksterName.setAttribute('type', 'text')
    email.setAttribute('type', 'text')
    password.setAttribute('type', 'text')
    pranksterName.placeholder = "Name your prankster"
    email.placeholder = "Email"
    password.placeholder = "Society's Passcode"
    btnEnter.textContent = 'Get In Looser :p'

    btnReturningPrankster.textContent = 'Have a prankster already?'
    btnReturningPrankster.addEventListener('click', () => onNavigate('/returningPrankster'))
    btnEnter.addEventListener('click', () => onNavigate('/playground'))
    title.textContent = 'The prank Society'
    div.append(title, pranksterName, email, password, btnEnter, btnReturningPrankster)

    return div
}