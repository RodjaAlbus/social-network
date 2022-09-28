import { updateDoc } from "../../importsFirebase.js"
import { onNavigate } from "../../main.js"

export class Player {
  constructor(playerObj) {
    this.countWS = document.getElementById('gameArea').offsetWidth + .5 //PUNTO DECIMAL PARA QUE FIRESTORE LO PUEDA LEER
    this.countDA = document.getElementById('gameArea').offsetHeight / 2
    this.maxSpeed = 25
    this.velocity = { x: 0, y: 0 }
    this.playerObj = playerObj
    this.width = playerObj.offsetWidth
    this.height = playerObj.offsetHeight
    this.gaWidth = document.getElementById('gameArea').offsetWidth
    this.gaHeight = document.getElementById('gameArea').offsetHeight
    
  }

  update(key, borders, doors, playerRef) {
    switch (key) {
      case 'up':
        this.velocity.y = -this.maxSpeed
        this.velocity.x = 0
        break;
      case 'down':
        this.velocity.y = this.maxSpeed
        this.velocity.x = 0
        break;
      case 'left':
        this.velocity.x = this.maxSpeed
        this.velocity.y = 0
        break;
      case 'right':
        this.velocity.x = -this.maxSpeed
        this.velocity.y = 0

        break;
    }
    this.checkForCollition(borders)
    this.checkForDoors(doors)
    this.countWS += this.velocity.y
    this.countDA += this.velocity.x
    this.playerObj.style.left = (String(this.countDA) + 'px')
    this.playerObj.style.top = (String(this.countWS) + 'px')
    console.log(playerRef)

    //UPDATE FIRESTORE----------------------------------------------------------------------
    updateDoc(playerRef, {
      top: this.playerObj.getBoundingClientRect().top,
      left: this.playerObj.getBoundingClientRect().left
    })
    console.log(this.playerObj.getBoundingClientRect().top)
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
    })
  }

  checkForDoors(doors) {
    let playerRect = this.playerObj.getBoundingClientRect()
    let boundaries = doors.getBoundingClientRect()
    if (playerRect.y + this.velocity.y <= boundaries.y + boundaries.height &&
      playerRect.x + playerRect.width + this.velocity.x >= boundaries.x &&
      playerRect.x + this.velocity.x <= boundaries.x + boundaries.width &&
      playerRect.y + playerRect.height + this.velocity.y >= boundaries.y) {
          onNavigate('/gossiper')        
    }

  }

}
