
var should = require('should');
var io = require('socket.io-client');
    //server = require('../app');
    //server = require('../1millionScaleApp');
// Load Chance
var Chance = require('chance');
var chance = new Chance();



var socketURL = 'http://0.0.0.0:3000';

var options ={
  transports: ['websocket','ws'],
  'force new connection': true
};

var chatUser1 = {'name':'Tom'};
var chatUser2 = {'name':'Sally'};
var chatUser3 = {'name':'Dana'};
  
describe("Chat Server",function(){
  var superClient =  io.connect(socketURL, options);
  /* Test 1 - A Single User */
  it('Should broadcast new user once they connect',function(done){
    var client = io.connect(socketURL, options);
    var UID;
    client.on('connection',function(data){
      console.log(data);
      UID = data.source;
      data.payload.should.equal("new user connected => " + UID);
      client.disconnect();
      done(); 

      //client.emit('broadcast','hi');
    });

    /*client.on('connection',function(usersName){
      usersName.should.be.type('object');
      usersName.paylod.should.equal("new user connected => " + UID);
      // If this client doesn't disconnect it will interfere 
      //with the next test 
      client.disconnect();
      done(); 
    });*/
  });



  /* Test 2 - Allow 1 thousand connected users */
/*  
  it('should allow 1 thousand users to connect',function(done){
    var IDs = [];
    var numUsers=1000;
    var onceTearMeDown = true;
    //disable timeouts as we need to test with alot of users
    this.timeout(10000);

    //teardown code
      var teardown1000 = function(){
        onceTearMeDown = false
        console.log("******");
        //console.log(IDs);
        console.log(Object.keys(IDs).length);
        console.log("******");
        IDs.length.should.aboveOrEqual(numUsers);
        //now tear down 1,000,002 users from server
        for (var i = 0; i <= numUsers; i++) {
          IDs[i][1].disconnect()
        };
        done();
      };


    for (var i = 0; i < numUsers+1; i++) {
          var client = io.connect(socketURL, options);
          var UID;

          client.on('connection',function(data){
            if( onceTearMeDown ){ 
              var storable = new Array(i,client,data.source);
              IDs.push(storable);
              //push unique user id and client connection
              var sizeOfConnections = IDs.length
              //console.log("added user "+i+": "+storable)
              //console.log(IDs)
              //console.log(sizeOfConnections)
              if (sizeOfConnections > numUsers){
                teardown1000();
              }
            }
          });

    };

  });
*/

  /* Test 3 - Allow 1 million and 1 connected users */
  /*
  it('should allow 1 million and 1 users to connect',function(done){
    console.log(" $$$$ 1 Million and 1 Users $$$ ")
    var numUsers = 1000001
    var halfUsers = 500001
    var IDs = [];
    var onceTearMeDown = true;
    //disable timeouts as we need to test with alot of users
    this.timeout(0);

    //teardown code
      var teardown1000001 = function(){
        onceTearMeDown = false;
        IDs.length.should.aboveOrEqual(halfUsers);
        //now tear down 1,000,002 users from server
        for (var i = 0; i < IDs.length; i++) {
          IDs[i][1].disconnect()
        };
        done();
      };


    for (var i = 0; i < numUsers; i++) {
          var client = io.connect(socketURL, options);
          var UID;

          client.on('connection',function(data){
            if( onceTearMeDown ){ 
              var storable = new Array(i,client,data.source);
              IDs.push(storable);
              //push unique user id and client connection
              var sizeOfConnections = IDs.length
              if (sizeOfConnections >= halfUsers){
                teardown1000001();
              }
            }
          });

    };

  });
*/

  /* Test 4 - Allow 1 million and 1 hello messages */
  
  it('should allow 1 thousand to submit hangman picks',function(done){
    var numUsers = 100001
    var IDs = [];
    var connections = [];
    var messages = [];
    var onceTearMeDown = true;
    var onceAllMessages = true;
    //disable timeouts as we need to test with alot of users
    this.timeout(0);

    //1 million new users say hi
      var helloFrom1000001Users = function(){
        onceAllMessages ==false
        IDs.length.should.aboveOrEqual(numUsers);
        //now tear down 1,000,002 users from server
        for (var i = 0; i < IDs.length; i++) {
          var UID = IDs[i][2]
          //say hello from 1,000,001 users!
          var RANDOM_LETTER_TO_SUBMIT = chance.character({casing: 'lower',alpha: true});
          
          connections[i].emit('submit',{payload:RANDOM_LETTER_TO_SUBMIT,source:UID} );
          //superClient.emit('submit',{payload:RANDOM_LETTER_TO_SUBMIT,source:UID} );

        };
        //done();
      };
    //teardown code
      var teardown1000001 = function(){
        onceTearMeDown = false
        IDs.length.should.aboveOrEqual(numUsers);
        //now tear down 1,000,002 users from server
        for (var i = 0; i < IDs.length; i++) {
          connections[i].emit('broadcast',{payload: "user "+IDs[i][2]+" has left the game"})
          connections[i].disconnect();
          //IDs[i][1].emit('broadcast',{payload: "user "+IDs[i][2]+" has left the game"}).disconnect()
          //superClient.emit('broadcast',{payload: "user "+IDs[i][2]+" has left the game"});
        };
        done();
      };


    for (var i = 0; i < numUsers+1; i++) {
          connections.push(io.connect(socketURL, options));
          var UID;

          connections[i].on('connection',function(data){
            if( onceTearMeDown ){ 
              var storable = new Array(i,1,data.source);
              IDs.push(storable);
              //push unique user id and client connection
              var sizeOfConnections = IDs.length
              if (sizeOfConnections > numUsers){
                //teardown1000001();
                onceTearMeDown = false
                console.log("*** 100,001 Users!! ***")
                helloFrom1000001Users();
              }
            }
          });

          
          //here is the broadcast code
          connections[i].on('broadcast',function(data){
            //client is set up to recieve messages
            if( onceAllMessages ){ 
              //console.log(data)
              var storable = new Array(i,1,data.source);
              messages.push(storable);
              //push unique user id and client connection
              var sizeOfConnections = messages.length
              if (sizeOfConnections > numUsers){
                onceAllMessages = false
                teardown1000001();
                //helloFrom1000001Users();
              }
            }
          });


    };

  });
  

});
