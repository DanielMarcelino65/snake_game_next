// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5dM8xfiOCl9oI-YVjpS-Zxm0S0yOl-rA",
  authDomain: "snake-game-next.firebaseapp.com",
  projectId: "snake-game-next",
  storageBucket: "snake-game-next.appspot.com",
  messagingSenderId: "361521289128",
  appId: "1:361521289128:web:14280a9c9aedf80fd76f9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };
