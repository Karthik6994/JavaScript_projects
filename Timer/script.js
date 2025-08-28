let timeLeft = 10;
let timer;

let num1 = Math.floor(Math.random() * 100);
let num2 = Math.floor(Math.random() * 100);

let problem = document.getElementById("problem");
problem.textContent = `What is ${num1} + ${num2} = ?`;

let time = document.getElementById("time");
timer = setInterval(() => {
  timeLeft--;
  time.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    document.getElementById("message").textContent = "MALWARE ATTACKED!";
    document.getElementById("message").className = "attack";
  }
}, 1000);

document.getElementById("submit").onclick = function () {
  let val = Number(document.getElementById("answer").value);
  if (val == num1 + num2 && timeLeft > 0) {
    clearInterval(timer);
    document.getElementById("message").textContent = "You're SAFE!";
    document.getElementById("message").className = "safe";
  } else {
    document.getElementById("message").textContent = "Wrong, try again!";
  }
};
