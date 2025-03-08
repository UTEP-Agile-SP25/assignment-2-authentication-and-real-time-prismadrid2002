// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB78fqGa9BDWJqgSBSrqwtbAz_6oSfRdZk",
  authDomain: "madrid-arroyos-sandbox.firebaseapp.com",
  projectId: "madrid-arroyos-sandbox",
  storageBucket: "madrid-arroyos-sandbox.firebasestorage.app",
  messagingSenderId: "548854807994",
  appId: "1:548854807994:web:a6c35b84cc7b888b3cb183"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app
