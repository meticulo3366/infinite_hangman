//puzzle = require('./gameLogic.js');


module.exports = function (io,puzzle) {
  'use strict';
  io.on('connection', function (socket) {
    //create word for game!
    console.log(puzzle);
    //puzzle.newPuzzle()

    socket.broadcast.emit('user connected');
    io.sockets.emit('game', {
        turn: puzzle.getAttempts(),
        word: puzzle.getCurrent()
    });

    socket.on('message', function (from, msg) {

      console.log('recieved message from', from, 'msg', JSON.stringify(msg));

      console.log('broadcasting message');
      console.log('payload is', msg);
      io.sockets.emit('broadcast', {
        payload: msg || from,
        source: from
      });

      console.log('broadcast complete');
    });

    socket.on('submit', function (letter, msg) {

      console.log('recieved letter => ', letter, 'msg', JSON.stringify(msg));

      //now apply the game logic!
      puzzle.setCurrent(letter);

      console.log('broadcasting message');
      console.log('payload is', msg);
      console.log('SOLUTION IS:', puzzle.getSolution() );
      console.log('CurrentWord IS:', puzzle.getCurrent()  );
      console.log('Turns IS:', puzzle.getAttempts() );
      io.sockets.emit('submit', {
        turn: puzzle.getAttempts(),
        word: puzzle.getCurrent()
      });

      console.log('broadcast complete');
    });

  });
};

