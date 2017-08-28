(function(){
  var score, currentRoundScore = 0, winningScore, activePlayer, lastRoll;
  var PLAYER1 = 0,
      PLAYER2 = 1;

  function gameOver(){
    return score[activePlayer] + currentRoundScore >= winningScore;
  }

  function newGame(scoreToWin){
    score = [0,0];
    winningScore = scoreToWin || 20;
    currentRoundScore = 0;
    activePlayer = PLAYER1;
  }

  function setWinningScore(newScore){
    return winningScore;
  }

  function rollDice(){
    var roll = [getRollValue(), getRollValue()];
    lastRoll = roll;
    processRoll(roll);
  }

  function processRoll(roll){
		if (resetScore(roll)) {
      score[activePlayer] = 0;
			endTurn();
		} else if (roundOver(roll)) {
			endTurn();
		} else {
      currentRoundScore += (roll[0] + roll[1]);
      if(gameOver()){
        commitScore();
      }
		}
  }

  function commitRound(){
    commitScore();
    endTurn();
  }

  function commitScore(){
    score[activePlayer] += currentRoundScore;
  }

  function resetScore(roll){
    return roll[0] === 6 && roll[1] === 6;
  }

  function roundOver(roll){
    return roll[0] === 1 && roll[1] === 1;
  }

  function getRollValue(){
    return Math.floor(Math.random() * 6) + 1;
  }

  function endTurn() {
      activePlayer = activePlayer === PLAYER1 ? PLAYER2 : PLAYER1;
      currentRoundScore = 0;
  };

  function getWinner(){
    if(gameOver()){
      return activePlayer;
    }else{
      return null;
    }
  }

  window.game = {
    newGame,
    rollDice,
    gameOver,
    setWinningScore,
    commitRound,
    getWinner,
    getLastRoll: function() {return lastRoll;},
    getCurrentScore: function(){return score;},
    getCurrentState: function(){return {
      score,
      activePlayer,
      currentRoundScore
    }}
  }

})()