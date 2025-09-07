// target img element
const img = document.getElementById("hero");
const oldSrc = img.src;
img.src = "alt.jpg";

console.log(`Old image is ${oldSrc}; New image is ${img.src}`);
