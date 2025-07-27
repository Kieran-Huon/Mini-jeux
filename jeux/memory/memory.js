const emojis = ['🍕', '🎮', '🐶', '🐺', '🚀', '🍩', '🐱', '⚽️'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matched = 0;
let tries = 0;

const board = document.getElementById("board");
const triesEl = document.getElementById("tries");
const starsEl = document.getElementById("stars");
const restartBtn = document.getElementById("restart");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  board.innerHTML = '';
  shuffle(cards);
  cards.forEach(emoji => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  this.innerText = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    tries++;
    triesEl.textContent = tries;
    updateStars();

    const [first, second] = flippedCards;
    if (first.dataset.emoji === second.dataset.emoji) {
      // ✅ Paires trouvées : ajouter une classe matched
      setTimeout(() => {
        first.classList.add('matched');
        second.classList.add('matched');
        flippedCards = [];
        matched++;
        if (matched === emojis.length) {
          setTimeout(() => alert("🎉 Bravo, tu as gagné !"), 300);
        }
      }, 500);
    } else {
      setTimeout(() => {
        flippedCards.forEach(card => {
          card.classList.remove('flipped');
          card.innerText = '';
        });
        flippedCards = [];
      }, 800);
    }
  }
}

function updateStars() {
  if (tries <= 10) {
    starsEl.textContent = '🌟🌟🌟';
  } else if (tries <= 15) {
    starsEl.textContent = '🌟🌟';
  } else {
    starsEl.textContent = '🌟';
  }
}

restartBtn.addEventListener('click', () => {
  flippedCards = [];
  matched = 0;
  tries = 0;
  triesEl.textContent = tries;
  starsEl.textContent = '🌟🌟🌟';
  createBoard();
});

createBoard();
