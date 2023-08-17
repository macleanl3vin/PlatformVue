// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCpyhal5VrTpMe4bwhmeizC3J8tznlg2vM",
  authDomain: "platformvuefirebase.firebaseapp.com",
  projectId: "platformvuefirebase",
  storageBucket: "platformvuefirebase.appspot.com",
  messagingSenderId: "131719952092",
  appId: "1:131719952092:web:0d8bc66c32919e4100e619",
  measurementId: "G-ELKLNV0BQ6"
};

// How to initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};




