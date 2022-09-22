export const auth = {}
export const db = {}

export const collection = jest.fn()

export const createUserWithEmailAndPassword = jest.fn((auth, email, password )=>{
    if(email && password) return Promise.resolve({email: email, password: password})
    else{Promise.reject()}
})

export const addDoc = jest.fn(()=>{
    return Promise.resolve({})
})

export const updateProfile = jest.fn(()=>{
    return Promise.resolve({})
})