
export class Player {
  constructor (gameArea, playerObj) {
    this.countWS = 0
    this.countDA = 0
    this.maxSpeed = 5
    this.velocity = { x: 0, y: 0 }
    this.playerObj = playerObj
    this.width = playerObj.offsetWidth
    this.height = playerObj.offsetHeight
    this.gaWidth = gameArea.offsetWidth
    this.gaHeight = gameArea.offsetHeight
  }

  update (keys, lastKey, borders) {
    this.checkForCollition(borders)

    this.countWS += this.velocity.y
    this.countDA += this.velocity.x
    this.playerObj.style.left = (String(this.countDA) + 'px')
    this.playerObj.style.top = (String(this.countWS) + 'px')
    if (keys.w.pressed && lastKey === 'w') {
      this.velocity.y = -this.maxSpeed
    } else if (keys.s.pressed && lastKey === 's') {
      this.velocity.y = this.maxSpeed
    } else if (keys.d.pressed && lastKey === 'd') {
      this.velocity.x = this.maxSpeed
    } else if (keys.a.pressed && lastKey === 'a') {
      this.velocity.x = -this.maxSpeed
    } else {
      this.velocity = { x: 0, y: 0 }
    }
    // BORDES
    if (this.countWS < 0) this.countWS = 0
    if (this.countDA < 0) this.countDA = 0
    if (this.countWS > this.gaHeight - this.height) this.countWS = this.gaHeight - this.height
    if (this.countDA > this.gaWidth - this.width) this.countDA = this.gaWidth - this.width
  }

  checkForCollition (borders) {
    const playerRect = this.playerObj.getBoundingClientRect()
    borders.forEach(element => {
      for (let i = 0; i < element.children.length; i++) {
        const boundaries = element.children[i].getBoundingClientRect()
        if (playerRect.y + this.velocity.y <= boundaries.y + boundaries.height &&
                    playerRect.x + playerRect.width + this.velocity.x >= boundaries.x &&
                    playerRect.x + this.velocity.x <= boundaries.x + boundaries.width &&
                    playerRect.y + playerRect.height + this.velocity.y >= boundaries.y) {
          this.velocity = { x: 0, y: 0 }
        }
      }
    })
  }
}
