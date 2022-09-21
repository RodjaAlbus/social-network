export class InputHandler {
  constructor () {
    this.lastKey = ''
    this.keys = {
      w: {
        pressed: false
      },
      s: {
        pressed: false
      },
      a: {
        pressed: false
      },
      d: {
        pressed: false
      }
    }
    window.addEventListener('keydown', ({ key }) => {
      // console.log(key);
      switch (key) {
        case 'a':
          this.keys.a.pressed = true
          this.lastKey = 'a'
          break
        case 'd':
          this.keys.d.pressed = true
          this.lastKey = 'd'
          break
        case 'w':
          this.keys.w.pressed = true
          this.lastKey = 'w'
          break
        case 's':
          this.keys.s.pressed = true
          this.lastKey = 's'
          break
      }
    })
    window.addEventListener('keyup', ({ key }) => {
      switch (key) {
        case 'a':
          this.keys.a.pressed = false
          break
        case 'd':
          this.keys.d.pressed = false
          break
        case 'w':
          this.keys.w.pressed = false
          break
        case 's':
          this.keys.s.pressed = false
          break
      }
    })
  }
}
