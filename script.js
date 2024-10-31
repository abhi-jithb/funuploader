const photoInput = document.getElementById("photoInput");
const uploadBtn = document.getElementById("uploadBtn");
const photosDiv = document.getElementById("photos");

uploadBtn.addEventListener("click", () => {
    const file = photoInput.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        // Display the uploaded image
        displayPhoto(event.target.result);
    };

    reader.readAsDataURL(file);
});

// Function to display a photo
function displayPhoto(url) {
    const container = document.createElement("div");
    container.classList.add("photo-item");

    const img = document.createElement("img");
    img.src = url;
    container.appendChild(img);

    const emojiDiv = document.createElement("div");
    emojiDiv.classList.add("emoji-reaction");
    emojiDiv.innerHTML = "😊"; // Optional emoji
    container.appendChild(emojiDiv);

    photosDiv.appendChild(container);
}
