let currentImageIndex = 0;

function getImages() {
  return document.querySelectorAll(".carousel img");
}

function prevImage() {
  const images = getImages();
  if (images.length === 0) return;
  images[currentImageIndex].classList.remove("active");
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  images[currentImageIndex].classList.add("active");
}

function nextImage() {
  const images = getImages();
  if (images.length === 0) return;
  images[currentImageIndex].classList.remove("active");
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.add("active");
}

function toggleInput(source) {
  const urlInput = document.getElementById("url-input");
  const fileInput = document.getElementById("file-input");

  if (source === "url") {
    urlInput.style.display = "block";
    fileInput.style.display = "none";
  } else if (source === "local") {
    urlInput.style.display = "none";
    fileInput.style.display = "block";
  }
}

function addImage() {
  const urlInput = document.getElementById("image-url");
  const fileInput = document.getElementById("local-image");
  let newImageSrc = "";

  if (urlInput.value.trim() !== "") {
    newImageSrc = urlInput.value.trim();
  } else if (fileInput.files[0]) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      createImageElement(event.target.result);
    };
    fileReader.readAsDataURL(fileInput.files[0]);
    return;
  } else {
    alert("Please provide a valid image URL or upload an image file.");
    return;
  }

  createImageElement(newImageSrc);
  urlInput.value = "";
  fileInput.value = "";
}

function createImageElement(src) {
  const carousel = document.querySelector(".carousel");
  const newImage = document.createElement("img");
  newImage.src = src;
  newImage.alt = "New Image";

  const images = getImages();
  if (images.length > 0) {
    images[currentImageIndex].classList.remove("active");
  }
  newImage.classList.add("active");
  carousel.insertBefore(newImage, carousel.querySelector(".controls"));
  currentImageIndex = images.length;
}
