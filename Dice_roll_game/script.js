function rollDice() {
  let random1 = Math.floor(Math.random() * 6) + 1;
  let random2 = Math.floor(Math.random() * 6) + 1;

  document.getElementById("dice1").src = "images/dice" + random1 + ".png";
  document.getElementById("dice2").src = "images/dice" + random2 + ".png";

  let result = "";
  if (random1 > random2) {
    result = "Player 1 Wins!";
  } else if (random2 > random1) {
    result = "Player 2 Wins!";
  } else {
    result = "It's a Draw!";
  }

  document.getElementById("result").innerText = result;
}
