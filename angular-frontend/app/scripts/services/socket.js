'use strict';
angular.module('chatApp')
.factory('chatSocket', function (socketFactory) {
      var socket = socketFactory();
      socket.forward('connected');
      socket.forward('broadcast');
      socket.forward('submit');
      return socket;
  });
