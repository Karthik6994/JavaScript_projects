const board = document.getElementById('board');
const diceDisplay = document.getElementById('dice');
const winnerDisplay = document.getElementById('winner');
const playersBtn = document.querySelectorAll('.player-btn');

const totalCells = 100;
let playerPositions = [0, 0, 0, 0];
const colors = ['red', 'blue', 'green', 'orange'];

for (let i = totalCells; i >= 1; i--) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.id = `cell-${i}`;
  cell.innerText = i;
  board.appendChild(cell);
}

function movePawn(playerIndex, steps) {
  let oldPos = playerPositions[playerIndex];
  let newPos = oldPos + steps;

  if (newPos > totalCells) newPos = oldPos;

  if (oldPos > 0) {
    const oldCell = document.getElementById(`cell-${oldPos}`);
    const pawn = oldCell.querySelector(`.pawn.player${playerIndex}`);
    if (pawn) oldCell.removeChild(pawn);
  }

  playerPositions[playerIndex] = newPos;

  if (newPos > 0) {
    const newCell = document.getElementById(`cell-${newPos}`);
    const pawnDiv = document.createElement('div');
    pawnDiv.classList.add('pawn', `player${playerIndex}`);
    pawnDiv.style.backgroundColor = colors[playerIndex];
    newCell.appendChild(pawnDiv); 
  }

  if (newPos === totalCells) {
    winnerDisplay.innerText = `🎉 Player ${playerIndex + 1} Wins!`;
    playersBtn.forEach(btn => btn.disabled = true);
  }
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

playersBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const playerIndex = parseInt(btn.dataset.player) - 1;
    const dice = rollDice();
    diceDisplay.innerText = dice;
    movePawn(playerIndex, dice);
  });
});
