// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjesWNPzpcJk4k1_lmJgEBv5x8D05ineU",
  authDomain: "fir-javascript-crud-ac1fe.firebaseapp.com",
  projectId: "fir-javascript-crud-ac1fe",
  storageBucket: "fir-javascript-crud-ac1fe.appspot.com",
  messagingSenderId: "706713407852",
  appId: "1:706713407852:web:e8ff4d774e985b6ce8e349",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) => 
  addDoc(collection(db, 'tasks'), {
    title,
    description
  })

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

