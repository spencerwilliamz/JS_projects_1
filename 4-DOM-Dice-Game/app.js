/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




var scores, roundScore, activePlayer, gamePlaying, dice1, dice2;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	
	// On first roll, disable winning score input
	document.querySelector('.gameThresh').style.display = 'none';
	
	if (gamePlaying) {
		// What happens when you click the button?
	
		// 1. Random Number
		dice1 = Math.floor(Math.random() * 6) + 1;
		dice2 = Math.floor(Math.random() * 6) + 1;

		// 2. Dispaly the Result
		var diceDOM1 = document.querySelector('.dice1');
		diceDOM1.style.display = 'block';
		diceDOM1.src = 'dice-' + dice1 + '.png';
		
		var diceDOM2 = document.querySelector('.dice2');
		diceDOM2.style.display = 'block';
		diceDOM2.src = 'dice-' + dice2 + '.png';
	
	
		// 3. 
		
		if (dice1 === 6 && dice2 === 6) {
			//Total score is reset, next player's turn
			scores [activePlayer] = 0;
			console.log(dice1, dice2);
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();

		} else if (dice1 !== 1 && dice2 !== 1) {
			//Add score
			roundScore += (dice1 + dice2);
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			
		} else {
			//Next player
			console.log(dice1, dice2);
			nextPlayer();
		}

		
	}
});
	


document.querySelector('.btn-hold').addEventListener('click', function () {
	
	if (gamePlaying) {
		// 1. Add CURRENT score to GLOBAL score
		scores [activePlayer] += roundScore;
	
		// 2. Update UI 
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.gameThresh').value;
		var winningScore;
		
		// Undefined, 0, null, "" are COERCED to false
		// Anything else is COERCED to true
		
		if(input) {
			winningScore = input;
		} else {
			winningScore = 20; // default score
		};
	
		// 3. Check if player has won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		
		} else {
			//4. Next player
			nextPlayer();
		}		
	}

});


function nextPlayer() {
		//Next player
		
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		// ^^ Ternary Operator
		// "Is active player 0?  If yes, change the active player to 1.  If no, change to 0."
		
		roundScore = 0;
		
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');
		
		document.querySelector('.dice1').style.display = 'none';
		document.querySelector('.dice2').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);


function init() {

	
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
		
	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';

	document.querySelector('.gameThresh').style.display = 'block';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';	
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	
	
};




//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

// ^^ these methods of querySelector are referred to as "setter" --> sets a value


//var x = document.querySelector('#score-0').textContent;
//console.log(x);

// ^^ this method of querySelector is referred to as "getter" --> gets a value