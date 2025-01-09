// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIuIKW70F_Xp94WiWGs-zBRfhxIxzPlxs",
  authDomain: "chit-chat-b048f.firebaseapp.com",
  projectId: "chit-chat-b048f",
  storageBucket: "chit-chat-b048f.firebasestorage.app",
  messagingSenderId: "449018803069",
  appId: "1:449018803069:web:39b86e6de166dbc9045214"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()