function play(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  let result = "";
  if (playerChoice === computerChoice) {
    result = "It's a Tie! 😐";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You Win! 🎉";
  } else {
    result = "Computer Wins! 🤖";
  }

  document.getElementById("result").innerText =
    `You: ${playerChoice} | Computer: ${computerChoice} → ${result}`;
}
