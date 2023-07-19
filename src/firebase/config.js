
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'



// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDFHJyKjpCZLwfNZO9-ADI8P0h3-uDaa1c",
  authDomain: "olx-clone-a79b3.firebaseapp.com",
  projectId: "olx-clone-a79b3",
  storageBucket: "olx-clone-a79b3.appspot.com",
  messagingSenderId: "707287500245",
  appId: "1:707287500245:web:02e44ed57604c89c7c295c",
  measurementId: "G-E86QPZZ2KM"
};  

// Initialize Firebase
export const fireBase = initializeApp(firebaseConfig);
export const auth = getAuth(fireBase);
export const db = getFirestore(fireBase);




