import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXIRAA_dO7R50QbrtNZW6vLTzWqZGqDCY",
  authDomain: "picuploader-51d50.firebaseapp.com",
  projectId: "picuploader-51d50",
  storageBucket: "picuploader-51d50.appspot.com",
  messagingSenderId: "353467371454",
  appId: "1:353467371454:web:a2b72f6ff08f6e3c35f3ef",
  measurementId: "G-Z4K0HSWYFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const photoInput = document.getElementById("photoInput");
const uploadBtn = document.getElementById("uploadBtn");
const photosDiv = document.getElementById("photos");

uploadBtn.addEventListener("click", async () => {
  const file = photoInput.files[0];
  if (!file) return;

  // Create a storage reference
  const storageRef = ref(storage, `photos/${file.name}`);

  // Upload file
  await uploadBytes(storageRef, file);

  // Get the image URL
  const downloadURL = await getDownloadURL(storageRef);

  // Add image URL to Firestore
  await addDoc(collection(db, "photos"), {
    url: downloadURL,
    emoji: ""
  });

  // Display the uploaded image
  displayPhoto(downloadURL);
});

// Function to display a photo
function displayPhoto(url) {
  const container = document.createElement("div");
  container.classList.add("photo-container");

  const img = document.createElement("img");
  img.src = url;
  container.appendChild(img);

  const emojiDiv = document.createElement("div");
  emojiDiv.classList.add("emoji");
  emojiDiv.innerHTML = "😊";
  container.appendChild(emojiDiv);

  photosDiv.appendChild(container);
}
