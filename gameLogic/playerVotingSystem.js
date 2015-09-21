//this is not yet used!!!

'use strict';
//boolean to enable locking and unlocking of the voting system
var  isTakingVotes = false;
//store the values the users selected
var  keyHash       = {'a':0,'b':0,'c':0,'d':0,'e':0}
//just need to check if the user voted using the user hash table
var  userHash      = {'user1':'a','user2':'b','user3':'a'}

//the comment below is a random thought
//perhaps each key to user
//var  keyMap        = {'a':{"user1","user2","user3"},'b','c','d','e'}

_reset = function(){
	keyMap        = {'a':0,'b':0,'c':0,'d':0,'e'}
	isTakingVotes = false;
}

_storeUserPick = function(key,user){
	// if the user has already picked a key,
	// dont let them choose again
	if( userHash[user] === undefined ){

	}else{
		userHash[user] = key
	}
}

//method to allow the user to update their key choice,
//this function is not yet implemented


//increment the user key hash
_incrementKeyHash = function(key){	
	keyMap[key] = keyMap[key] + 1
}

//decrement user key hash
_decrementKeyHash = function(key){
	keyMap[key] = keyMap[key] - 1
}

/*

	Save Turn and Game Methods may need
	to be in another file!!!!!

*/

//save a game turn to the database
_saveTurn = function(){
	// var model       = {}
	//     model.users = userHash
	//     model.keys  = keyHash
	//someModel.save(model)
}

//create game object for saving
// i.e. mongo init process
_createGame = function(){
	_reset()
	// var model       = {}
	//     model.users = userHash
	//     model.keys  = keyHash

	// something model save here 
}

//now save the game at end of game
_saveGame = function(){
	// var model = {}
	// model.result
}

//increment the keyHash value
exports.voteKey = function(key,user){
	if( isTakingVotes == true ){ 
		//increment integer
		_updateKeyHash()
		//update user pick
		_updateUserHash()

		//now some kind of logic...
	}
}

//trigger a vote if its allowed
exports.triggerVote = function(){
	if( isTakingVotes == false ){ 
		isTakingVotes == true;
		setTimeout(10000, function( ) {
			isTakingVotes == false;
			//now trigger a socket event,
			//emit a message to the frontend
		};)
	}
}

//determine if the user can pick votes or not
exports.canSubmit = function(){
	return isTakingVotes;
} 
