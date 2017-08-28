document.querySelector('.btn-roll').addEventListener('click', function() {

	document.querySelector('.gameThresh').style.display = 'none';
	game.rollDice();

	ui.displayRoll(game.getLastRoll());
	ui.update(game.getCurrentState());
	if(game.gameOver()){
		ui.displayVictory(game.getWinner());
	}
});

document.querySelector('.btn-hold').addEventListener('click', function () {
	game.commitRound();
	ui.update(game.getCurrentState());
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	game.newGame();	
	var current = game.getCurrentState();
	ui.newGame(current);
};

init();