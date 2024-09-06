// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC20tYdwvHuIGdv8Ri9BYv7DWvM3VeNWh4",
  authDomain: "waste-management-system-4c725.firebaseapp.com",
  databaseURL: "https://waste-management-system-4c725-default-rtdb.firebaseio.com",
  projectId: "waste-management-system-4c725",
  storageBucket: "waste-management-system-4c725.appspot.com",
  messagingSenderId: "993777935306",
  appId: "1:993777935306:web:ea67882f9180d13e692533"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

const user = auth.currentUser;

const userId = user ? user.uid : null;

export { app, auth, db, userId, user };