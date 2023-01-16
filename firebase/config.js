import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, onSnapshot,updateDoc, doc, where} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword,
  onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrBRYBpfmPwdBVKr3EB-BbJCXVdhtB0Xs",
  authDomain: "lottery-a7464.firebaseapp.com",
  projectId: "lottery-a7464",
  storageBucket: "lottery-a7464.appspot.com",
  messagingSenderId: "899756747667",
  appId: "1:899756747667:web:2dc339327e085a7a899666"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();



export{
  db,collection,getDocs,addDoc,serverTimestamp,query,onSnapshot,updateDoc,doc,where,
  auth,createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword,
  onAuthStateChanged,
  storage, ref, uploadBytesResumable, getDownloadURL}