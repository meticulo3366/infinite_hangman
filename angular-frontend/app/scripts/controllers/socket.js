'use strict';

//inject angular value 'nickName'

angular.module('chatApp')
.controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter, hangmanInterface) {
  //$scope.nickName = nickName;
  $scope.messageLog = 'Ready to chat!';
  
  $scope.sendMessage = function() {
    var nickName = hangmanInterface.getUID();
    
    var submit = $scope.message.match('^\/submit (.*)');
    //submit letter method
    if (angular.isDefined(submit) && angular.isArray(submit) && submit.length === 2) {
      //get UID from hangman interface
      
      console.log(submit)
      console.log(submit[1])
      //console.log(match[1][1])
      submit = submit[1];
      /*
      $scope.message = '';
      $scope.messageLog = messageFormatter(new Date(), 
                      nickName, 'user submitted character => ' + submit + '!') + $scope.messageLog;
      */
      //$scope.nickName = nickName;
      //hangmanInterface.setWord

      //send user pick to server
      chatSocket.emit('submit', submit,nickName)
      $scope.message = '';
    }else{
      $log.debug('sending message', $scope.message);
      chatSocket.emit('message', nickName, $scope.message);
      $scope.message = '';
    }
  };

  //this socket channel is the general communications channel
  $scope.$on('socket:broadcast', function(event, data) {
    $log.debug('got a message', event.name);
    if (!data.payload) {
      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
      return;
    } 
    var messageSource = data.source || ''
    $scope.$apply(function() {
      $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), messageSource, data.payload);
    });
  });

  $scope.$on('socket:connected', function(event,data){
    //only set the UID once!
    if ( hangmanInterface.getUID() == 0 ){ 
      console.log("socket:connection")
      console.log(data)
      var nickNameNEW = data.source
      $scope.message = ''
      $scope.messageLog = messageFormatter(new Date(), 
                        nickNameNEW, ' has joined the game ') + $scope.messageLog;
      $scope.nickName = nickNameNEW; 
      //set the angular user ID
      hangmanInterface.setUID(nickNameNEW)
      console.log("$$$$$$$$$")
      console.log( hangmanInterface.getUID() )
    }
    //this.nickName = hangmanInterface.getUID()

    //angular.value('nickName',nickNameNEW)
  });

  /*$scope.$on('socket:submit', function(event, data) {
    $log.debug('got a message', event.name);
    if (!data.payload) {
      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
      return;
    } 
    $scope.$apply(function() {
      $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
    });
  });*/

});
