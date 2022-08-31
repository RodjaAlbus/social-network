import { onNavigate } from "../main.js"

export const alreadyPrankster = () => {
    const div = document.createElement('div')
    div.className = "Welcome"
    const title = document.createElement('h2')

    const btnback = document.createElement('button')
    const btnEnter = document.createElement('button')

    const pranksterName = document.createElement('input')
    const password = document.createElement('input')


    pranksterName.setAttribute('type', 'text')
    password.setAttribute('type', 'text')

    pranksterName.placeholder = "ID yourself prankster"
    password.placeholder = "Whats your passcode?"
   
    btnback.textContent = 'Create Prankster'
    btnback.addEventListener('click', () => onNavigate("/"))
    btnEnter.textContent = 'Get In Looser :p'
    btnEnter.addEventListener('click', () => onNavigate('/playground'))
    title.textContent = 'The prank Society'
    div.append(title,  pranksterName, password, btnEnter, btnback)

    return div
}