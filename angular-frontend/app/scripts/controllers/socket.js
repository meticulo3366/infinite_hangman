'use strict';

angular.module('chatApp')
.controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter, hangmanInterface) {
  //init
  $scope.messageLog  = 'Ready to chat!';
  
  $scope.sendMessage = function() {
    //get UID from hangman interface
    var nickName = hangmanInterface.getUID();

    //submit letter method    
    var submit = $scope.message.match('^\/submit (.*)');
    if (angular.isDefined(submit) && angular.isArray(submit) && submit.length === 2) {
      //get char from GUI
      submit = submit[1];
      //send user pick to server
      chatSocket.emit('submit', submit,nickName)
      //clear console window
      $scope.message = '';
    }else{
      /*$log.debug('sending message', $scope.message);*/

      //broadcast a message to all users
      chatSocket.emit('message', nickName, $scope.message);
      //clear console window
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

    }

  });


});
