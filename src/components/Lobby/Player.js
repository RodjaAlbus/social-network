
export class Player {
  constructor(playerObj) {
    this.countWS = 0
    this.countDA = 0
    this.maxSpeed = 3
    this.velocity = { x: 0, y: 0 }
    this.playerObj = playerObj
    this.width = playerObj.offsetWidth
    this.height = playerObj.offsetHeight
    this.gaWidth = document.getElementById('gameArea').offsetWidth - 30
    this.gaHeight = document.getElementById('gameArea').offsetHeight - 30
  }

  update(keys, lastKey) {
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
    if (this.countWS < 110) this.countWS = 110
    if (this.countDA < 30) this.countDA = 30
    if (this.countWS > this.gaHeight - this.height) this.countWS = this.gaHeight - this.height
    if (this.countDA > this.gaWidth - this.width) this.countDA = this.gaWidth - this.width
  }

}
