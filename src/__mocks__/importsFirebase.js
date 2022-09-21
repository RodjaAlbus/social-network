export const auth = {}
export const db = {}

export const collection = jest.fn()

export const createUserWithEmailAndPassword = jest.fn(()=>{
    //if(email.value && password.value) Promise.resolve
    //else{Promise.reject}
    return Promise.resolve({})
    //Promise.reject({})
})

export const addDoc = jest.fn(()=>{
    return Promise.resolve({})
})