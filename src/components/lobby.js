export const playground = () => {
  const div =  document.createElement('div')
  
  const title = document.createElement('h1')
  title.textContent = 'The prank Society'
  const paperEffect = document.createElement('div')
  paperEffect.id = 'paperH1'

  //close sesion part

  //game part
  const game =  document.createElement('section')
  game.id = 'lobby'
  const image = document.createElement('img')
  image.src = '../img/player/mapVer2.png'
  image.id = 'map'

  game.append(image)

  //movement part
  const movement =  document.createElement('div')
  movement.id = 'movButtons'
  const upBtn = document.createAttribute('button')
  upBtn.id = 'upBtn'
  upBtn.className = 'movementButtons'
  const downBtn = document.createAttribute('button')
  downBtn.id = 'downBtn'
  downBtn.className = 'movementButtons'
  const leftBtn = document.createAttribute('button')
  leftBtn.id = 'leftBtn'
  leftBtn.className = 'movementButtons'
  const rightBtn = document.createAttribute('button')
  rightBtn.id = 'rightBtn'
  rightBtn.className = 'movementButtons'

  movement.append(upBtn, downBtn, leftBtn, rightBtn)

  //write a message part
  const footer =  document.createElement('footer')

  div.append(paperEffect, title, game, movement)
  return div
}
