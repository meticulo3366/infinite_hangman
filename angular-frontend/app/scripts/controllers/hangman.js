'use strict';

angular.module('chatApp')
.controller('HangmanCtrl', function ($log, $scope, chatSocket, messageFormatter, nickName,hangmanInterface) {
  $scope.word = hangmanInterface.getWord();
  $scope.turn = hangmanInterface.getTurn();
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
    $log.debug('got a message', event.name);
    console.log(data)
    console.log(data.word)
    console.log(data.turn)
    /*if (!data.payload) {
      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
      return;
    }*/
    $scope.$apply(function() {
      $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
        //update the local service data and the user experience
        hangmanInterface.setWord(data['word']);
        $scope.word = hangmanInterface.getWord();
        hangmanInterface.setTurn(data['turn']);
        $scope.turn = hangmanInterface.getTurn();
    });
  });
  
});
