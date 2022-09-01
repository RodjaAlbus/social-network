import { onNavigate } from "../main.js"

export const alreadyPrankster = () => {
    const div = document.createElement('div')
    const title = document.createElement('h1')
    title.textContent = 'The prank Society'

    const section = document.createElement('section')
    section.className = 'returningPrankster'
  
    const btnEnter = document.createElement('button')
    btnEnter.textContent = 'Get In Looser :p'
    btnEnter.addEventListener('click', () => onNavigate('/playground'))

    const pranksterName = document.createElement('input')
    pranksterName.id = 'name'
    pranksterName.setAttribute('type', 'text')
    pranksterName.placeholder = "ID yourself prankster"
    const password = document.createElement('input')
    password.setAttribute('type', 'text')
    password.placeholder = "Whats your passcode?"

    const btnback = document.createElement('button')
    btnback.textContent = 'Create Prankster'
    btnback.className = 'footer'
    btnback.addEventListener('click', () => onNavigate("/"))

    section.append(pranksterName, password, btnEnter,);
    div.append(title, section, btnback)

    return div
}