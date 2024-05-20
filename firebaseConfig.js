import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBUZD6aT9w-bHTJUgPAE-sEQKLn2e5sdRE",
    authDomain: "firstproject-262ed.firebaseapp.com",
    projectId: "firstproject-262ed",
    storageBucket: "firstproject-262ed.appspot.com",
    messagingSenderId: "879681515241",
    appId: "1:879681515241:web:821a9cb999d59a0c49ca78",
    measurementId: "G-DVLR1JWP1M"
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, collection, addDoc, db, getDocs,deleteDoc, doc}

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
