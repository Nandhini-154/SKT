import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBpDtfQLy24S6sU7FDK-bUgPQ7N22_Qz6s",
  authDomain: "sri-kavin-s-tailors.firebaseapp.com",
  projectId: "sri-kavin-s-tailors",
  storageBucket: "sri-kavin-s-tailors.firebasestorage.app",
  messagingSenderId: "131978571986",
  appId: "1:131978571986:web:d0027bd1c36e16a0ec7d0b",
  measurementId: "G-E4RV0N3M90"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Checking credentials...");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login success:", userCredential.user.email);
        window.location.href = "admin-dashboard.html";
    } catch (error) {
        console.error("Login error:", error);
        alert("Invalid username or password.");
    }
});
