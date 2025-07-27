const buttons = document.querySelectorAll("button[data-choice]");
const resultText = document.getElementById("outcome");
const playerChoice = document.getElementById("player-choice");
const computerChoice = document.getElementById("computer-choice");
const restartBtn = document.getElementById("restart");

const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");

let playerScore = 0;
let computerScore = 0;
const choices = ["pierre", "feuille", "ciseaux"];

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (playerScore >= 3 || computerScore >= 3) return;

    const user = button.dataset.choice;
    const computer = choices[Math.floor(Math.random() * 3)];

    playerChoice.textContent = `👤 Ton choix : ${emoji(user)} ${capitalize(user)}`;
    computerChoice.textContent = `🤖 Ordinateur : ${emoji(computer)} ${capitalize(computer)}`;

    const result = getResult(user, computer);
    resultText.textContent = result;

    updateScore(result);
  });
});

restartBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  updateUI();
  resultText.textContent = "Fais ton choix !";
  restartBtn.style.display = "none";
});

function getResult(user, computer) {
  if (user === computer) return "😐 Égalité !";
  if (
    (user === "pierre" && computer === "ciseaux") ||
    (user === "feuille" && computer === "pierre") ||
    (user === "ciseaux" && computer === "feuille")
  ) {
    return "🎉 Bravo, tu as gagné ce tour !";
  }
  return "💥 Dommage, l'ordi gagne ce tour...";
}

function updateScore(result) {
  if (result.includes("Bravo")) playerScore++;
  else if (result.includes("ordi gagne")) computerScore++;

  updateUI();

  if (playerScore >= 3) {
    resultText.textContent = "🏆 Tu as gagné la partie !";
    restartBtn.style.display = "inline-block";
  } else if (computerScore >= 3) {
    resultText.textContent = "🤖 L'ordinateur gagne la partie...";
    restartBtn.style.display = "inline-block";
  }
}

function updateUI() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function emoji(choice) {
  if (choice === "pierre") return "🪨";
  if (choice === "feuille") return "📄";
  if (choice === "ciseaux") return "✂️";
}
