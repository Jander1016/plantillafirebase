// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {
    doc,
    collection,
    getDocs,
    getFirestore,
    setDoc,
    deleteDoc
} from "firebase/firestore";

import { uuid} from 'uuidv4'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export function firebaseConfig() { // Your web app's Firebase configuration
    const configFB = {
        apiKey: "AIzaSyBXWFy8lpOTX32mwyfnkzT26KD_ifKX8FY",
        authDomain: "sis-react.firebaseapp.com",
        projectId: "sis-react",
        storageBucket: "sis-react.appspot.com",
        messagingSenderId: "200451713089",
        appId: "1:200451713089:web:b3a17ffaaf7677048abec0"
    };

    // Initialize Firebase
    const app = initializeApp(configFB);
}

export const firebaseRegisterUser = (email, password) => {
    createUserWithEmailAndPassword(getAuth(), email, password).then(credentialUser => credentialUser)
}

export const firebaseStartSesion = async (email, password) => {
    try {
        let credentialUser = await signInWithEmailAndPassword(getAuth(), email, password)
    } catch (error) {
        return false
    }
    return true
}

export const firebaseFindUser = async (customer) => {

    let listCustomers = []
    let findCustomer = collection(getFirestore(), customer)
    let result = await getDocs(findCustomer)

    result.forEach(document => {
        document.id
        let data = document.data()
        listCustomers.push(data)
    })
    return listCustomers
}

export const firebaseRegisterCustomer = (collect, document) => {
    document.id = uuid()
    const newCustom = doc(getFirestore(), collect, document.id);

    // later...
    setDoc(newCustom, document);
}

export const firebaseDeleteCustomer= async(collect, id) => {
  await deleteDoc(doc(getFirestore(), collect, id));
}