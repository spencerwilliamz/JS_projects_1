/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




var scores, roundScore, activePlayer, gamePlaying, prevDice, gameThresh;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	
	if (gamePlaying) {
		// What happens when you click the button?
	
		// 1. Random Number
		var newDice = Math.floor(Math.random() * 6) + 1;

		// 2. Dispaly the Result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + newDice + '.png';
	
	
		// 3. 
		
		if (prevDice === 6 && newDice === 6) {
			//Total score is reset, next player's turn
			scores [activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			console.log(prevDice, newDice);
			nextPlayer();

		} else if (newDice !== 1) {
			//Add score
			roundScore += newDice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			
		} else {
			//Next player
			console.log(prevDice, newDice);
			nextPlayer();
		}
		
		prevDice = newDice;
		
	}
});
	


document.querySelector('.btn-hold').addEventListener('click', function () {
	
	if (gamePlaying) {
		// 1. Add CURRENT score to GLOBAL score
		scores [activePlayer] += roundScore;
	
		// 2. Update UI 
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	
		// 3. Check if player has won the game
		if (scores[activePlayer] >= 20) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
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
		
		roundScore = 0;
		
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');
		
		document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', determineScore);


function determineScore() {
	
	// 1. Hide everything
	var divsToHide = document.getElementsByClassName("player-0-panel");
    for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.display = "none";
    }
	// 2. Show gameThresh
	document.getElementsByClassName("gameThresh").style.display = 'block';
	
	// 3. Set gameThresh variable == input from user
	var gameThresh = document.querySelector('.gameThresh').value
};

function init() {

	
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
		
	document.querySelector('.dice').style.display = 'none';

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