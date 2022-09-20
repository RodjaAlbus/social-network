const lobby = document.getElementById('gameArea')

export const playground = () => {
  const div = lobby.cloneNode(true)
  const title = document.createElement('h2')
  div.style.display = 'block'
  /*
    const btnback = document.createElement('button')
    const btnEnter = document.createElement('button')

    btnback.textContent = 'Create Prankster'
    btnback.addEventListener('click', () => onNavigate("/"))
    btnEnter.textContent = 'Get In Looser :p'
    title.textContent = 'The prank Society'
    div.append(title,  pranksterName, password, btnEnter, btnback)
*/
  return div
}
