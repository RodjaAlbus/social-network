export class Player {
  constructor(playerObj) {
    this.countWS = document.getElementById('gameArea').offsetWidth / 2
    this.countDA = document.getElementById('gameArea').offsetHeight / 2
    this.maxSpeed = 10
    this.velocity = { x: 0, y: 0 }
    this.playerObj = playerObj
    this.width = playerObj.offsetWidth
    this.height = playerObj.offsetHeight
    this.gaWidth = document.getElementById('gameArea').offsetWidth
    this.gaHeight = document.getElementById('gameArea').offsetHeight
  }

  update(key, borders) {
    this.checkForCollition(borders)

    this.countWS += this.velocity.y
    this.countDA += this.velocity.x
    this.playerObj.style.left = (String(this.countDA) + 'px')
    this.playerObj.style.top = (String(this.countWS) + 'px')
    if (key === 'up') {
      this.velocity.y = -this.maxSpeed
      this.velocity.x = 0
    } 
    if (key === 'down') {
      this.velocity.y = this.maxSpeed
      this.velocity.x = 0
    } 
    if (key === 'left') {
      this.velocity.x = this.maxSpeed
      this.velocity.y = 0
    } 
    if (key === 'right') {
      this.velocity.x = -this.maxSpeed
      this.velocity.y = 0
    }
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
