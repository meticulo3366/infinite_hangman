//puzzle = require('./gameLogic.js');
var shortid = require("shortid")

//use redis for a message queue

//array of connected users with socket key values
var connectedUsers = {};

module.exports = function (io,puzzle) {
  //'use strict';
  io.on('connection', function (socket) {
    //create word for game!
   // console.log(puzzle);
    //puzzle.newPuzzle()

    //generate new user and send welcome message
    var newUserID  = shortid.generate();
    var newUserMsg = "new user connected => " + newUserID;
    console.log(newUserMsg)
    
    //store the socket value in the UID key value store
    connectedUsers[newUserID] = io;

    // socket.broadcast.emit('user connected');
    //connectedUsers[newUserID].emit('connected', {
    connectedUsers[newUserID].emit('connected', {
      payload: newUserMsg,
      source: newUserID
    });
    
    io.emit('broadcast',{
      payload: newUserMsg,
    });

    // create the init game data for the user once
    // they have connected
    // use a private message!
    connectedUsers[newUserID].emit('submit', {
        turn: puzzle.getAttempts(),
        word: puzzle.getCurrent()
    });
    
  //});
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

        console.log('recieved letter => ', letter);

        if ( puzzle.checkKey(letter) ){ 

          //now apply the game logic!
          puzzle.setCurrent(letter);

          console.log('broadcasting message');
          //console.log('payload is', msg);
          console.log('SOLUTION IS:', puzzle.getSolution() );
          console.log('CurrentWord IS:', puzzle.getCurrent()  );
          console.log('Turns IS:', puzzle.getAttempts() );

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

          io.emit('submit', {
            turn: puzzle.getAttempts(),
            word: puzzle.getCurrent(),
            from: from,
            status: gameStatus
          });  

          /*io.emit('broadcast', {
            payload: 'user submitted character => ' + letter + '!' ,
            source: from
          });*/

        }else{
            console.log(letter);
            /*io.sockets.emit('broadcast', {
              payload: "\'"+letter+"\' has already been tried" ,
              source: from
            });*/
        }
        console.log('broadcast complete');
    });

   /*socket.on('disconnect', function() {
      console.log('Got disconnect!');

      var i = connectedUsers[socket];
      delete connectedUsers[i];
   });*/

  });
};

