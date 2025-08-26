function guess(userGuess) {
  let toss = Math.random() < 0.5 ? "Heads" : "Tails";
  let resultText = `Toss Result: ${toss} <br>`;
  
  if (userGuess === toss) {
    resultText += "🎉 You guessed it right!";
  } else {
    resultText += "😅 Wrong guess, try again!";
  }
  
  document.getElementById("result").innerHTML = resultText;
}
