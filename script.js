const player1Name = document.getElementById('name-0');
const player2Name = document.getElementById('name-1');
const editIcon = document.querySelector('.edit-icon');
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const score0 = document.getElementById('score-0');
const score1 = document.getElementById('score-1');
const current0 = document.getElementById('current-0');
const current1 = document.getElementById('current-1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;
let newNamePlayer1 = 'Pelaaja1';
let newNamePlayer2 = 'Pelaaja2';

const gameInit = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    player1Name.innerHTML = `Pelaaja1 <i class="edit-icon" onclick="renamePlayer(0)">📝</i>`;
    player2Name.innerHTML = `Pelaaja2 <i class="edit-icon" onclick="renamePlayer(1)">📝</i>`;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    player0.classList.remove('player-winner');
    player1.classList.remove('player-winner');
    player0.classList.add('player-active');
    player1.classList.remove('player-active');
    dice.classList.add('hidden');
}
gameInit();
function renamePlayer(playerId) {
    const playerNameElement = document.getElementById(`name-${playerId}`);
    let newName = prompt(`Nimesi on ${playerId + 1} (enintään 4 kirjainta):`);

    if (newName !== null) {
        newName = newName.substring(0,4);

        if (playerId === 0) {
            newNamePlayer1 = newName;
        } else if (playerId === 1) {
            newNamePlayer2 = newName;
        }

        playerNameElement.innerHTML = `${newName} <i class="edit-icon" onclick="renamePlayer(${playerId})">📌</i>`;
    }
}

const switchPlayer = function () {
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');
    currentScore = 0;
}

btnRoll.addEventListener('click', function () {
    if (playing) {
        const diceRoll = Math.trunc(Math.random() * 6) + 1;

        dice.classList.remove('hidden');
        dice.src = `images/dice${diceRoll}.png`;

        if (diceRoll !== 1) {
            currentScore += diceRoll;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]
        if (scores[activePlayer] >= 100) {
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            const winningPlayer = document.getElementById(`name-${activePlayer}`);
            const winnerName = activePlayer === 0 ? newNamePlayer1 : newNamePlayer2;
            winningPlayer.innerHTML = `${winnerName}<br>Voittaja - 🏅`;
        } else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', gameInit);