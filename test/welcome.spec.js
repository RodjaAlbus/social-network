import { Welcome } from '../src/components/welcome.js'

jest.mock('../src/inportsFirebase.js')

describe('Welcome', () => {
  it('debería ser una función', () => {
    expect(typeof Welcome).toBe('function')
  })
})
