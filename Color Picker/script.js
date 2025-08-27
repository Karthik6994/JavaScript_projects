const buttons = document.querySelectorAll(".color-btn");
const colorName = document.getElementById("colorName");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedColor = button.getAttribute("data-color");
    document.body.style.backgroundColor = selectedColor;
    colorName.textContent = selectedColor;
    colorName.style.color = selectedColor;
  });
});
