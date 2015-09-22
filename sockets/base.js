//puzzle = require('./gameLogic.js');
var shortid = require("shortid")

//use redis for a message queue

//array of connected users with socket key values
var connectedUsers = {};
var users = 0;

module.exports = function (io,puzzle,isDisableBroadcast) {
  //'use strict';
  io.on('connection', function (socket) {
    //create word for game!
    users ++;
    //generate new user and send welcome message
    var newUserID  = shortid.generate();
    var newUserMsg = "new user connected => " + newUserID;
    console.log(newUserMsg)
    
    //store the socket value in the UID key value store
    connectedUsers[newUserID] = io;

    // only tell the one person they have connected
    connectedUsers[newUserID].emit('connected', {
      payload: newUserMsg,
      source: newUserID
    });
    
    //slow mode enables broadcasting!
    if(isDisableBroadcast){
      io.emit('broadcast',{
        payload: newUserMsg,
      });
    }

    // create the init game data for the user once
    // they have connected
    // use a private message!
    connectedUsers[newUserID].emit('submit', {
        turn: puzzle.getAttempts(),
        word: puzzle.getCurrent()
    });

    socket.on('message', function (from, msg) {

        console.log('recieved message from', from, 'msg', JSON.stringify(msg));

        console.log('broadcasting message');
        console.log('payload is', msg);

        io.emit('broadcast', {
          payload: msg || from,
          source: from
        });

        console.log('broadcast complete');
    });

    socket.on('submit', function (letter, from) {

        //console.log('recieved letter => ', letter);

        if ( puzzle.checkKey(letter) ){ 

          //now apply the game logic!
          puzzle.setCurrent(letter);

          //now determine 'Win' or 'Lose' or 'continue' conditions
          // win = 1, lose = 2, continue = 0
          var gameStatus = 0;
          if( puzzle.isLost() ){
            gameStatus = 2;
            puzzle.newPuzzle();
          }else if ( puzzle.isWon() ) {
            gameStatus = 1;
            puzzle.newPuzzle();
          } else{
            gameStatus = 0;
          };

          var currentGame = {
            turn: puzzle.getAttempts(),
            word: puzzle.getCurrent(),
            from: from,
            status: gameStatus
          };
          //update clients on the game
          io.emit('submit', currentGame);  

          //slow mode enables broadcasting!
          if(isDisableBroadcast){
            io.emit('broadcast', {
              payload: 'user submitted character => ' + letter + '!' ,
              source: from
            });
          }

        }else{
          //slow mode enables broadcasting!
          if(isDisableBroadcast){
            io.emit('broadcast', {
              payload: "\'"+letter+"\' has already been tried" ,
              source: from
            });
          }
        }
        
    });

  });
};

