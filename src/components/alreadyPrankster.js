import { onNavigate } from "../main.js"
import { auth } from "../lib/config.js"
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js'

export const alreadyPrankster = () => {
    const div = document.createElement('div')
    const title = document.createElement('h1')
    title.textContent = 'The prank Society'
    const paperEffect = document.createElement('div')
    paperEffect.id = 'paperH1'

    const section = document.createElement('section')
    section.className = 'returningPrankster'

    const sectionTitle = document.createElement('h2')
    sectionTitle.textContent = "long time no see"
    /*const pranksterName = document.createElement('input')
    pranksterName.className = 'inputs2'
    pranksterName.setAttribute('type', 'text')
    pranksterName.placeholder = "ID yourself prankster"*/
    const pranksterName = document.createElement('input')
    pranksterName.className = 'inputs2'
    pranksterName.setAttribute('type', 'text')
    pranksterName.placeholder = "Email"
    const password = document.createElement('input')
    password.setAttribute('type', 'text')
    password.id = 'password'
    password.className = 'inputs2'
    password.placeholder = "whats your passcode?"

    const btnEnter = document.createElement('button')
    btnEnter.textContent = 'Get In Looser :p'
    btnEnter.className = "buttons"
    btnEnter.addEventListener('click', () => {
        signInWithEmailAndPassword(auth, pranksterName.value, password.value)
            .then(() => {
                onNavigate('/playground')
            })
            .catch((error) => {
                alert('Prankster not registered')
            });
    })

    const btnback = document.createElement('button')
    btnback.textContent = 'Create Prankster'
    btnback.className = 'footer'
    btnback.addEventListener('click', () => onNavigate("/"))
    const footerPaperEffact = document.createElement('div')
    footerPaperEffact.id = 'footerPaper'

    section.append(sectionTitle, pranksterName, password, btnEnter,);
    div.append(paperEffect, title, section, footerPaperEffact, btnback)

    return div
}