import { Welcome } from '../src/components/welcome.js'
import 'jest-canvas-mock';

jest.mock('../src/importsFirebase.js')

describe('Welcome', () => {

  beforeEach(()=>{
    document.body.innerHTML = ''

    document.body.innerHTML = '<div id="root"></div>'
    document.body.innerHTML += '<div id="Player"></div>'
    document.body.innerHTML += '<div id="gameArea"></div>'
    document.body.innerHTML += '<div id="roomVertical"></div>'
    document.body.innerHTML += '<div id="roomHorizontal"></div>'

  })

  it('shoud be a function', () => {
    expect(typeof Welcome).toBe('function')
  })

  it('it shoud render correctly', () => {
    //AAA: Arrange Act Assert

    //Arrange:
    
    //Act:
    document.getElementById('root').appendChild(Welcome())
  
    //Assert:
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('should login successfully', ()=>{
    document.getElementById('root').appendChild(Welcome())
    document.getElementById('name').value = 'rosalba'
    document.getElementById('email').value = 'rosalbamusician@gmail.com'
    document.getElementById('password').value = '12341234'
    document.getElementById('buttonEnter').click()
    //navigate
    //regect paths
  })


})
