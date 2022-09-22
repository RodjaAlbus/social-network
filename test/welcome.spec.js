import { Welcome } from '../src/components/welcome.js'
import 'jest-canvas-mock';

jest.mock('../src/importsFirebase.js')

describe('Welcome', () => {

  beforeEach(()=>{
    document.body.innerHTML = ''

    document.body.innerHTML = '<div id="root"></div>'
    document.body.innerHTML += '<div id="gameArea"></div>'
  })

  it('shoud be a function', () => {
    expect(typeof Welcome).toBe('function')
  })

  it('it shoud render correctly', () => {
    //AAA: Arrange Act Assert
    //console.log(document.body.innerHTML)
    //Arrange:
    
    //Act:
    document.getElementById('root').appendChild(Welcome())
  
    //Assert:
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  it('should login successfully', ()=>{
    //Arrange:
    document.getElementById('root').appendChild(Welcome())
    document.getElementById('name').value = 'rosalba'
    document.getElementById('email').value = 'rosalbamusician@gmail.com'
    document.getElementById('password').value = '12341234'

    //Act:
    const btnEnter = document.getElementById('buttonEnter')
    
    //Assert:
    expect(btnEnter.click()).resolves.toBe({email: "rosalbamusician@gmail.com", password: '12341234'})
  })


})

    //navigate
    //regect paths