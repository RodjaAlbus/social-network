import { updateDoc } from "../../importsFirebase.js"

export class Player {
  constructor(playerObj) {
    this.countWS = document.getElementById('gameArea').offsetWidth/2
    this.countDA = document.getElementById('gameArea').offsetHeight/2
    this.maxSpeed = 3
    this.velocity = { x: 0, y: 0 }
    this.playerObj = playerObj
    this.width = playerObj.offsetWidth
    this.height = playerObj.offsetHeight
    this.gaWidth = document.getElementById('gameArea').offsetWidth
    this.gaHeight = document.getElementById('gameArea').offsetHeight
  }

  update(keys, lastKey, borders, pranksterRef) {
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

    if(keys.w.pressed || keys.s.pressed || keys.d.pressed || keys.a.pressed) {
      updateDoc(pranksterRef, {
        x: this.countDA,
        y: this.countWS
      });
    }
    // BORDES
    if (this.countWS < 0) this.countWS = 0
    if (this.countDA < 0) this.countDA = 0
    if (this.countWS > this.gaHeight - this.height) this.countWS = this.gaHeight - this.height
    if (this.countDA > this.gaWidth - this.width) this.countDA = this.gaWidth - this.width
  }

  checkForCollition(borders) {
    let playerRect = this.playerObj.getBoundingClientRect()
    borders.forEach(element => {
      let boundaries = element.getBoundingClientRect()
      if (playerRect.y + this.velocity.y <= boundaries.y + boundaries.height &&
        playerRect.x + playerRect.width + this.velocity.x >= boundaries.x &&
        playerRect.x + this.velocity.x <= boundaries.x + boundaries.width &&
        playerRect.y + playerRect.height + this.velocity.y >= boundaries.y) {
        this.velocity = { x: 0, y: 0 }
      }
    });
  }

}
