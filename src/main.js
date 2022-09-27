import { alreadyPrankster } from './components/alreadyPrankster.js'
import { playground } from './components/lobby.js'
import { message } from './components/PSMessage.js'
import { Welcome } from './components/welcome.js'

const routes = {
  '/': Welcome,
  '/returningPrankster': alreadyPrankster,
  '/message': message,
  '/playground': playground
}

export const onNavigate = (pathname) => {
  const root = document.getElementById('root')
  const gameArea  = document.getElementById('gameArea')
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )
  root.removeChild(root.firstChild)
  console.log(gameArea)
  gameArea.innerHTML = ""
  root.appendChild(routes[pathname]())
}

window.onpopstate = () => {
  const root = document.getElementById('root')
  const component = routes[window.location.pathname]
  root.removeChild(root.firstChild)
  root.appendChild(component())
}

window.addEventListener('load', () => {
  const root = document.getElementById('root')
  const component = routes[window.location.pathname]
  root.appendChild(component())

})
