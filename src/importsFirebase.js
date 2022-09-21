export {
    updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js'

import { getAuth } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js'
import { app } from '../lib/config.js'
export const auth = getAuth(app)

//console.log(auth);

export {
    doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js'

import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js'
export const db = getFirestore()
