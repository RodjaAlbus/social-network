import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js'

const firebaseConfig = {
  apiKey: 'AIzaSyCSgD9_s8A4dYNczhLP1SleKJqKEvOXWSk',
  authDomain: 'prank-society.firebaseapp.com',
  databaseURL: 'https://prank-society-default-rtdb.firebaseio.com',
  projectId: 'prank-society',
  storageBucket: 'prank-society.appspot.com',
  messagingSenderId: '277869336834',
  appId: '1:277869336834:web:6d9d21dea74baf835aca1b',
  measurementId: 'G-4QJG1KFMD7'
}

export const app = initializeApp(firebaseConfig)
