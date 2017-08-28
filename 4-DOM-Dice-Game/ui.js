(function(){

  var dom = {
    playerPanels: [$('.player-0-panel'),$('.player-1-panel')],
    totalScores: [$('.player-0-panel .player-score'), $('.player-1-panel .player-score')],
    currentScores: [$(`#current-0`),$(`#current-1`)],
    dice: [$('.dice1'), $('.dice2')]
  }

  function update(game){
    displayScore(game.score);
    displayCurrentScore(game.currentRoundScore, game.activePlayer);
    displayActivePlayer(game.activePlayer);
  }

  function displayRoll(roll){
    dom.dice.forEach((d, idx) => {
      d.show();
      d.attr('src','dice-' + roll[idx] + '.png');
    })
  }

  function displayScore(score){
    dom.totalScores[0].text(score[0]);
    dom.totalScores[1].text(score[1]);
  }

  function displayCurrentScore(currentScore, activePlayer){
    dom.currentScores[0].text(0);
    dom.currentScores[1].text(0);
    dom.currentScores[activePlayer].text(currentScore);
  }

  function displayActivePlayer(activePlayer){
    dom.playerPanels.forEach(p => p.removeClass('active'));
    dom.playerPanels[activePlayer].addClass('active');
  }

  function displayVictory(winner){
    dom.playerPanels[winner].find('.player-name').text('Winner!');
    dom.dice.forEach(d => d.hide());
    dom.playerPanels[winner].addClass('winner');
    dom.playerPanels[winner].removeClass('active')
  }

  function newGame(game){
    dom.playerPanels.forEach((p, idx) => {
      p.find('.player-name').text('Player' + (idx + 1));
    });
    displayActivePlayer(game.activePlayer);
    dom.dice.forEach(d => d.hide());    
    update(game);
  }

  window.ui = {
    displayRoll,
    displayVictory,
    newGame,
    update
  };
})()