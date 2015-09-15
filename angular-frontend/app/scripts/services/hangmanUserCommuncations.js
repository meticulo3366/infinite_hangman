'use strict';
// messaging between hangman game, chat interface, and user agent fingerprinting

//var User_Finger_Print;
//get user finger print here
/*new Fingerprint2().get(function(result){
  console.log(result);
  User_Finger_Print = result;
});*/

//configure service to connect hangman game and terminal socket based interface
angular.module('chatApp').factory('hangmanInterface', function() {
    var hangmanword = '/submit \'x\' letter to start';
    var turn = 0;
    
    return {
        getWord: function() {
            return hangmanword;
        },
        setWord: function(value) {
            hangmanword = value;
        },
        getTurn: function() {
            return turn;
        },
        setTurn: function(value){
        	turn = value;
        }
    }
});