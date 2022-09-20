export { 
    getAuth,  updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword 
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js'

import { app } from './config.js'
export const auth = getAuth(app)

export {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
  } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js'
  
export const db = getFirestore()

