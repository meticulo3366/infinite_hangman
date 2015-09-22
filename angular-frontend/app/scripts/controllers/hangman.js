'use strict';

angular.module('chatApp')
.controller('HangmanCtrl', function ($log, $scope, chatSocket, messageFormatter, nickName,hangmanInterface) {
  $scope.word   = hangmanInterface.getWord();
  $scope.turn   = hangmanInterface.getTurn();
  $scope.status = hangmanInterface.getStatus();

  // socket listener for game logic!
  $scope.$on('socket:submit', function(event, data) {
    $scope.$apply(function() {
      $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
        //update the local service data and the user experience
        hangmanInterface.setWord(data['word']);
        $scope.word = hangmanInterface.getWord();
        hangmanInterface.setTurn(data['turn']);
        $scope.turn = hangmanInterface.getTurn();

        var gameStatus = data['status'];
        //updated game status display
        if(gameStatus == 0){
          $scope.status =  10-hangmanInterface.getTurn() + " TURNS REMAINING"
        } else if (gameStatus == 1) {
          $scope.status = "GAME WON"
        } else if (gameStatus == 2) {
          $scope.status = "GAME LOST"
        };
    });
  });
  
});
