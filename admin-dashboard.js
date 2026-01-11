// admin-dashboard.js

import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please login first!");
    window.location.href = "admin-login.html";
  }
});

// Firestore collection
const designsCol = collection(db, "designs");

const form = document.getElementById("designForm");
const allDesignsDiv = document.getElementById("allDesigns");

// Render gallery
async function renderAdminGallery() {
  allDesignsDiv.innerHTML = "";

  const snapshot = await getDocs(designsCol);

  snapshot.forEach((docSnap) => {
    const d = docSnap.data();
    const id = docSnap.id;

    const item = document.createElement("div");
    item.className = "gallery-item";

    item.innerHTML = `
        <img src="${d.url}" alt="${d.name}">
        <span>${d.name} - ${d.subcategory}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    // Edit item
    item.querySelector(".edit-btn").addEventListener("click", async () => {
      const newName = prompt("New Design ID:", d.name);
      const newUrl = prompt("New Image URL:", d.url);
      const newCategory = prompt("New Category:", d.subcategory);

      if (newName && newUrl && newCategory) {
        await updateDoc(doc(db, "designs", id), {
          name: newName,
          url: newUrl,
          subcategory: newCategory
        });
        renderAdminGallery();
      }
    });

    // Delete item
    item.querySelector(".delete-btn").addEventListener("click", async () => {
      if (confirm("Delete this design?")) {
        await deleteDoc(doc(db, "designs", id));
        renderAdminGallery();
      }
    });

    allDesignsDiv.appendChild(item);
  });
}

// Add design
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("designName").value.trim();
  const subcategory = document.getElementById("categorySelect").value;
  const url = document.getElementById("imageUrl").value.trim();

  if (name && subcategory && url) {
    await addDoc(designsCol, { name, subcategory, url });
    renderAdminGallery();
    form.reset();
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "admin-login.html";
});

// Load initial gallery
renderAdminGallery();
