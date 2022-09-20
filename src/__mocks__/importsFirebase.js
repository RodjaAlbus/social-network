export const auth = {}
export const db = {}

export const collection = jest.fn()

export const createUserWithEmailAndPassword = jest.fn(()=>{
    return Promise.resolve({})
    //Promise.reject({})
})

export const addDoc = jest.fn(()=>{
    return Promise.resolve({})
})