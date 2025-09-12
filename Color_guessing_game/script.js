let targetColor;
let squaresContainer = document.getElementById("squares");
let colorCodeText = document.getElementById("colorCode");
let resultText = document.getElementById("result");

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function startGame() {
  squaresContainer.innerHTML = "";
  resultText.textContent = "Pick a color!";

  targetColor = randomColor();
  colorCodeText.textContent = targetColor;

  let colors = [targetColor];
  for (let i = 0; i < 5; i++) {
    colors.push(randomColor());
  }

  colors.sort(() => Math.random() - 0.5);

  colors.forEach(color => {
    let square = document.createElement("div");
    square.classList.add("square");
    square.style.background = color;
    square.addEventListener("click", () => checkGuess(color));
    squaresContainer.appendChild(square);
  });
}

function checkGuess(color) {
  if (color === targetColor) {
    resultText.textContent = "🎉 Correct! You guessed it!";
    document.querySelectorAll(".square").forEach(sq => {
      sq.style.background = targetColor;
    });
  } else {
    resultText.textContent = "❌ Wrong! Try again.";
  }
}

startGame();
