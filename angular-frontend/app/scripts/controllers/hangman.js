'use strict';

angular.module('chatApp')
.controller('HangmanCtrl', function ($log, $scope, chatSocket, messageFormatter, nickName,hangmanInterface) {
  $scope.word   = hangmanInterface.getWord();
  $scope.turn   = hangmanInterface.getTurn();
  $scope.status = hangmanInterface.getStatus();

  /*
  $scope.sendMessage = function() {
    var match = $scope.message.match('^\/nick (.*)');

    if (angular.isDefined(match) && angular.isArray(match) && match.length === 2) {
      var oldNick = nickName;
      nickName = match[1];
      $scope.message = '';
      $scope.messageLog = messageFormatter(new Date(), 
                      nickName, 'nickname changed - from ' + 
                        oldNick + ' to ' + nickName + '!') + $scope.messageLog;
      $scope.nickName = nickName;
    }

    $log.debug('sending message', $scope.message);
    chatSocket.emit('message', nickName, $scope.message);
    $scope.message = '';
  };
  */

  $scope.$on('socket:submit', function(event, data) {
    //$log.debug('got a message', event.name);

    $scope.$apply(function() {
      $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
        //update the local service data and the user experience
        hangmanInterface.setWord(data['word']);
        $scope.word = hangmanInterface.getWord();
        hangmanInterface.setTurn(data['turn']);
        $scope.turn = hangmanInterface.getTurn();

        var gameStatus = data['status'];
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
