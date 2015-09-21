'use strict';
// messaging between hangman game, chat interface, and user agent fingerprinting

//configure service to connect hangman game and terminal socket based interface
angular.module('chatApp').factory('hangmanInterface', function() {
    var hangmanword = '/submit \'x\' letter to start';
    var turn   = 0;
    var status = "Start Game";
    //used for submissions and UI experience
    var UID    = 0;
    
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
        },
        getStatus: function(){
            return status;
        },
        setStatus: function(value){
            status = value;
        },
        getUID: function(){
            return UID;
        },
        setUID: function(value){
            UID = value
        }
    }
});