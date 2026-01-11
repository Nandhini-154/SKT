// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpDtfQLy24S6sU7FDK-bUgPQ7N22_Qz6s",
  authDomain: "sri-kavin-s-tailors.firebaseapp.com",
  projectId: "sri-kavin-s-tailors",
  storageBucket: "sri-kavin-s-tailors.firebasestorage.app",
  messagingSenderId: "131978571986",
  appId: "1:131978571986:web:d0027bd1c36e16a0ec7d0b",
  measurementId: "G-E4RV0N3M90"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);

// Auth + Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { auth, db };

