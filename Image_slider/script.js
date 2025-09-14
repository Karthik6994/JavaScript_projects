const slidesContainer = document.getElementById("slides");
let totalImages = 5;

for (let i = 0; i < totalImages; i++) {
  const img = document.createElement("img");
  img.src = `https://picsum.photos/700/400?random=${Math.floor(Math.random() * 1000)}`;
  img.classList.add("slide");
  if (i === 0) img.classList.add("active");
  slidesContainer.appendChild(img);
}

const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0;

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[n].classList.add("active");
}

next.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});

prev.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});

setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 3000);
