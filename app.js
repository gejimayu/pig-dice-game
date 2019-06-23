/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const WINNING_SCORE = 2;
var globalScore, activePlayer, currentScore, dice, isWon;

function init() {
	globalScore = [0, 0];
	document.querySelector('#score-0').textContent = globalScore[0];
	document.querySelector('#score-1').textContent = globalScore[1];
	activePlayer = 0; // 0 for player 1, 1 for player 2
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	currentScore = [0, 0];
	document.querySelector('#current-0').textContent = currentScore[0];
	document.querySelector('#current-1').textContent = currentScore[1];
	isWon = false;
}

function changeTurn() {
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	activePlayer = (activePlayer === 0) ? 1 : 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function updateCurrentActiveScore(score) {
	currentScore[activePlayer] = score;
	document.querySelector('#current-' + activePlayer).textContent = currentScore[activePlayer];
}

document.querySelector('.btn-roll').addEventListener('click', function(event) {
	if (!isWon) {
		dice = Math.floor(Math.random(6) * 6) + 1;
		if (dice === 1) {
			// reset score
			updateCurrentActiveScore(0);
			// change turn
			changeTurn();
		} else {
			// update dice
			document.querySelector('.dice').src = 'dice-' + dice + '.png';
			// update current score
			updateCurrentActiveScore(currentScore[activePlayer] + dice);
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(event) {
	if (!isWon) {
		// add to global score
		globalScore[activePlayer] += currentScore[activePlayer];
		document.querySelector('#score-' + activePlayer).textContent = globalScore[activePlayer];
		// detemrine winner
		if (globalScore[activePlayer] >= WINNING_SCORE) {
			isWon = true;
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
		} else {
			// reset current active player's score
			updateCurrentActiveScore(0);
			// change turn
			changeTurn();
		}
	}
});

init();
