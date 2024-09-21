// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4e7wRf01l_exdIEAGD8hDKCXJCJO0bXE",
  authDomain: "e-hut-768cc.firebaseapp.com",
  projectId: "e-hut-768cc",
  storageBucket: "e-hut-768cc.appspot.com",
  messagingSenderId: "908035788213",
  appId: "1:908035788213:web:8773340532715636315dfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);