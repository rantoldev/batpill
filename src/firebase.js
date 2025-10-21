// Firebase initialization and helpers
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD96WBzgcd9atRLOoV3iiUxacYPoO1mZyM",
  authDomain: "pillfly.firebaseapp.com",
  projectId: "pillfly",
  storageBucket: "pillfly.firebasestorage.app",
  messagingSenderId: "818277389275",
  appId: "1:818277389275:web:2a56d1688914f483e34dfe",
  measurementId: "G-79452D2EEY"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
