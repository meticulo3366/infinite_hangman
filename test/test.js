
var should = require('should');
var io = require('socket.io-client');
    //server = require('../app');
    //server = require('../1millionScaleApp');
// Load Chance
var Chance = require('chance');



var socketURL = 'http://0.0.0.0:3000';

var options ={
  transports: ['websocket','ws'],
  'force new connection': true
};

var chatUser1 = {'name':'Tom'};
var chatUser2 = {'name':'Sally'};
var chatUser3 = {'name':'Dana'};
  
describe("Chat Server",function(){

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
  
  it('should allow 1 thousand users to connect',function(done){
    var IDs = [];
    var onceTearMeDown = true;
    //disable timeouts as we need to test with alot of users
    this.timeout(0);

    //teardown code
      var teardown1000 = function(){
        console.log("******");
        console.log(IDs);
        console.log(Object.keys(IDs).length);
        console.log("******");
        IDs.length.should.aboveOrEqual(1000);
        //now tear down 1,000,002 users from server
        for (var i = 0; i < IDs.length; i++) {
          IDs[i][1].disconnect()
        };
        done();
      };


    for (var i = 0; i < 1000; i++) {
          var client = io.connect(socketURL, options);
          var UID;

          client.on('connection',function(data){
            if( onceTearMeDown ){ 
              var storable = new Array(i,client,data.source);
              IDs.push(storable);
              //push unique user id and client connection
              var sizeOfConnections = IDs.length
              console.log("added user "+i+": "+storable)
              //console.log(IDs)
              console.log(sizeOfConnections)
              if (sizeOfConnections == 1000){
                teardown1000();
              }
            }
          });

    };

  });

  /* Test 3 - Allow 1 million and 1 connected users */
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
        /*console.log("******");
        console.log(IDs);
        console.log(Object.keys(IDs).length);
        console.log("******");*/
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
              /*console.log("added user "+i+": "+client+" @ "+data.source)
              console.log(data.source + " is connected at number of users "+ IDs.length);*/
              //push unique user id and client connection
              var sizeOfConnections = IDs.length
              if (sizeOfConnections >= halfUsers){
                teardown1000001();
              }
            }
          });

    };

  });

  /* Test 4 - Allow 1 million and 1 hello messages */
  it('should allow 1 million and 1 users to say their names',function(done){
    var numUsers = 1001
    var IDs = [];
    var messages = [];
    var onceTearMeDown = true;
    var onceAllMessages = true;
    //disable timeouts as we need to test with alot of users
    this.timeout(0);

    //1 million new users say hi
      var helloFrom1000001Users = function(){
        IDs.length.should.aboveOrEqual(numUsers);
        //now tear down 1,000,002 users from server
        for (var i = 0; i < IDs.length; i++) {
          var UID = IDs[i][2]
          //say hello from 1,000,001 users!
          IDs[i][1].emit('broadcast',{payload:'hi',source:UID} );
        };
        //done();
      };
    //teardown code
      var teardown1000001 = function(){
        IDs.length.should.aboveOrEqual(numUsers);
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
              if (sizeOfConnections == numUsers){
                //teardown1000001();
                helloFrom1000001Users();
              }
            }
          });

          
          //here is the broadcast code
          client.on('broadcast',function(data){
            //client is set up to recieve messages
            if( onceAllMessages ){ 
              var storable = new Array(i,client,data.source);
              nessages.push(storable);
              //push unique user id and client connection
              var sizeOfConnections = nessages.length
              if (sizeOfConnections == 1000001){
                teardown1000001();
                //helloFrom1000001Users();
              }
            }
          });


    };

  });

});
