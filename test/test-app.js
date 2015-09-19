
var should = require('should');
var io = require('socket.io-client'),
    server = require('../app');



var socketURL = 'http://0.0.0.0:3000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};

var chatUser1 = {'name':'Tom'};
var chatUser2 = {'name':'Sally'};
var chatUser3 = {'name':'Dana'};
  
describe("Chat Server",function(){

  /* Test 1 - A Single User */
  it('Should broadcast new user once they connect',function(done){
    var client = io.connect(socketURL, options);

    client.on('connect',function(data){
      client.emit('connection name',chatUser1);
    });

    client.on('new user',function(usersName){
      usersName.should.be.type('string');
      usersName.should.equal(chatUser1.name + " has joined.");
      /* If this client doesn't disconnect it will interfere 
      with the next test */
      client.disconnect();
      done(); 
    });
  });
});
