export {
    updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInAnonymously,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js'

import { getAuth } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js'
import { app } from '../lib/config.js'
export const auth = getAuth(app)
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js'
export const database = getDatabase(app)

//console.log(auth);

export {
    doc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where,
    onSnapshot, getDoc
} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js'

import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js'
export const db = getFirestore()
