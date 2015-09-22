
var should = require('should');
var io = require('socket.io-client');

// Load Chance
var Chance = require('chance');
var chance = new Chance();
var config = require('../config/config')
//Set up connection string
var hostName = process.env.SOCKET_SERVER || process.env.HOST || '0.0.0.0';
var socketURL = 'http://'+hostName+':'+config.server.port;
console.log(socketURL);

var options ={
  transports: ['websocket','ws'],
  'force new connection': true
};
  
/*   
  #########################################################

  Only One Test Is Run As This Is Used Now For Load Testing  

  #########################################################
*/
describe("Chat Server",function(){
  this.timeout(0)
  var superClient =  io.connect(socketURL, options);

/* Test 1 - A Single User */
/*
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
  });
*/


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
  
  it('should allow 5000 to submit hangman picks',function(done){
    //just test only '100,000' simultanious users!
    var numUsers = 5000
    var IDs = [];
    var connections = [];
    var messages = [];
    var onceTearMeDown = true;
    var onceAllMessages = true;
    //disable timeouts as we need to test with alot of users
    this.timeout(0);

    //the code used to submit letters all at once,
    // now they submit letters as soon as they
    // connect, this is to stagger the network requests

    /*
      var helloFrom1000001Users = function(){
        onceAllMessages ==false
        connections.length.should.aboveOrEqual(numUsers);
        //now tear down 1,000,002 users from server
        for (var i = 0; i < IDs.length; i++) {
          var UID = IDs[i][2]
          //say hello from 1,000,001 users!
          var RANDOM_LETTER_TO_SUBMIT = chance.character({casing: 'lower',alpha: true});
          
          //connections[i].emit('submit',RANDOM_LETTER_TO_SUBMIT,UID );
          IDs[i][1].emit('broadcast','hello',UID);
          IDs[i][1].emit('submit',RANDOM_LETTER_TO_SUBMIT,UID);
        };
        //done();
      };
    */


    //teardown code
      var teardown1000001 = function(){
        onceTearMeDown = false
        //now tear down 5,000 users from server
        for (var i = 0; i < IDs.length; i++) {
          IDs[i][1].disconnect();
        };
        done();
      };


    for (var i = 0; i < numUsers+1; i++) {
          var client = io.connect(socketURL, options)
          connections.push(client);
          var UID;

          connections[i].on('connected',function(data){
            if( onceTearMeDown ){ 
              var storable = new Array(i,client,data.source);
              IDs.push(storable);
              //push unique user id and client connection
              var sizeOfConnections = IDs.length
              var RANDOM_LETTER_TO_SUBMIT = chance.character({casing: 'lower',alpha: true});
              this.emit('submit',RANDOM_LETTER_TO_SUBMIT,data.source)
              if (sizeOfConnections > numUsers){
                //teardown1000001();
                onceTearMeDown = false
                console.log("*** 5,000 Users!! ***")
                //helloFrom1000001Users();
                teardown1000001();
              }
            }
          });


    };

  });
  

});
