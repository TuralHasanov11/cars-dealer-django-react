// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore}  from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCk4ZMfvGciiKjLFS9HFItIZi6bpdYSVPM",
  authDomain: "react-app-aad1b.firebaseapp.com",
  databaseURL: "https://react-app-aad1b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-app-aad1b",
  storageBucket: "react-app-aad1b.appspot.com",
  messagingSenderId: "226211159797",
  appId: "1:226211159797:web:9d204f93c2b139beff2fbc",
  measurementId: "G-S7KDYWMHN7"
};

const app = initializeApp(firebaseConfig);
const fileStorage = getStorage(app);

export { fileStorage }
export default getFirestore(app);

