var mongoose = require('mongoose');
var router = require('express').Router();
var async = require('async');
var db = require('../configuration.js');
var schema = require('../schema.js');
var models = require('../models.js');

// Module Imports
var authenticate_module = require('../../modules/authenticate.js');
var authenticate = authenticate_module.authenticate;
var functions_module = require('../../modules/functions.js');
//var mAux = require('./aux.js');
var mAux = require('./auxQ.js');

// Function Imports
var errorAdapter = functions_module.error_adapter;
var saveFriendRequest = mAux.saveFriendRequest;
var saveFriend = mAux.saveFriend;
var saveMessage = mAux.saveMessage;
//var validateAccount = mAux.validateAccount;
//var saveAccount = mAux.saveAccount;
//var validateClassicAccount = mAux.validateClassicAccount;
//var saveClassicAccount = mAux.saveClassicAccount;
//var sendMail = functions_module.sendMail;

//localhost:4080/api/task/send/friend/request/56dccd1d616cc7fd0758a614/56dccdaa3810b30b0872d184
router.get('/send/friend/request/:idUserA/:idUserB', function (req, res) {
    var idUserA = req.params.idUserA;
    var idUserB = req.params.idUserB;

    async.parallel({
        friend: function(callback) {
            setTimeout(function(){
                models.Friend
                .findOne({$or: [{_userA: idUserA, _userB: idUserB},
                				{_userA: idUserB, _userB: idUserA}]})
                //.deepPopulate()
                .exec(function (err, doc) {
                  // Need to be validated
                  callback(null, {errors: errorAdapter(models.Friend.modelName, err), doc: doc});

                });
            }, 200)
        },
        friendshipUserA: function (callback) {
            setTimeout(function(){
                models.Friendship
                .findOne({_user: idUserA})
                .exec(function (err, doc) {
                    callback(null, {errors: errorAdapter(models.Friendship.modelName, err), doc: doc});                 
                });
            }, 200)
        },
        friendshipUserB: function (callback) {
            setTimeout(function(){
                models.Friendship
                .findOne({_user: idUserB})
                .exec(function (err, doc) {
                    callback(null, {errors: errorAdapter(models.Friendship.modelName, err), doc: doc});                 
                });
            }, 200)
        }
  },
  function(err, results) {
	    var errors = "";
	    errors += results.friend.errors;
	    errors += results.friendshipUserA.errors;
	    errors += results.friendshipUserB.errors;

	    if (!errors)
	    {
			var friend = results.friend.doc;
			var friendshipUserA = results.friendshipUserA.doc;
			var friendshipUserB = results.friendshipUserB.doc;
			if (!friend)
			{
				friend = new models.Friend({_userA: idUserA, _userB: idUserB, accepted: false});
				// We have to verify if here exists some sentRequest
				friendshipUserA.sentRequests.push(friend._id);
				friendshipUserB.receivedRequests.push(friend._id);
				errors += errorAdapter(models.Friend.modelName, friend.validateSync());
				errors += errorAdapter(models.Friendship.modelName, friendshipUserA.validateSync());
				errors += errorAdapter(models.Friendship.modelName, friendshipUserB.validateSync());
				if (!errors)
				{
					var data = {
						friend: friend,
						friendshipUserA: friendshipUserA,
						friendshipUserB: friendshipUserB
					};
					saveFriendRequest(data, function (errors, output) {
						errors += errors;
						//if (!errors)
						//{

						//}
						//else
						//{
						return res.send({errors: errors, output: output});
						//}
					});
				}
				else
				{
					return res.send({errors: errors});
				}
			}
			else
			{
				errors += 'eDBExists;';
				return res.send({errors: errors});
			}
		}
		else
		{
			return res.send({errors: errors});
		}
	});
});

//localhost:4080/api/task/accept/friend/request/56dccd1d616cc7fd0758a614/56dccdaa3810b30b0872d184
router.get('/accept/friend/request/:idUserA/:idUserB', function (req, res) {
    var idUserA = req.params.idUserA;
    var idUserB = req.params.idUserB;
    console.log(req.params);
    async.parallel({
        messengerA: function(callback) {
            setTimeout(function(){
                models.Messenger
                .findOne({_user: idUserA})
                //.deepPopulate()
                .exec(function (err, doc) {
                  // Need to be validated
                  callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: doc});

                });
            }, 200)
        },
        messengerB: function(callback) {
            setTimeout(function(){
                models.Messenger
                .findOne({_user: idUserB})
                //.deepPopulate()
                .exec(function (err, doc) {
                  // Need to be validated
                  callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: doc});

                });
            }, 200)
        },
        friend: function(callback) {
            setTimeout(function(){
                models.Friend
                .findOne({_userA: idUserA, _userB: idUserB})
                //.deepPopulate()
                .exec(function (err, doc) {
                  // Need to be validated
                  callback(null, {errors: errorAdapter(models.Friend.modelName, err), doc: doc});

                });
            }, 200)
        },
        friendshipUserA: function (callback) {
            setTimeout(function(){
                models.Friendship
                .findOne({_user: idUserA})
                .exec(function (err, doc) {
                    callback(null, {errors: errorAdapter(models.Friendship.modelName, err), doc: doc});                 
                });
            }, 200)
        },
        friendshipUserB: function (callback) {
            setTimeout(function(){
                models.Friendship
                .findOne({_user: idUserB})
                .exec(function (err, doc) {
                    callback(null, {errors: errorAdapter(models.Friendship.modelName, err), doc: doc});                 
                });
            }, 200)
        },
        conversation: function (callback) {
            setTimeout(function(){
            	var conversation = new models.Conversation({participants: [idUserA, idUserB], group: false});
                callback(null, {errors: errorAdapter(models.Conversation.modelName, conversation.validateSync()), doc: conversation});                 
            }, 200)
        }
  },
  function(err, results) {
	    var errors = "";
	    errors += results.messengerA.errors;
	    errors += results.messengerB.errors;
	    errors += results.friend.errors;
	    errors += results.friendshipUserA.errors;
	    errors += results.friendshipUserB.errors;
	    errors += results.conversation.errors;

    	var messengerA = results.messengerA.doc;
    	var messengerB = results.messengerB.doc;
		var friend = results.friend.doc;
		var friendshipUserA = results.friendshipUserA.doc;
		var friendshipUserB = results.friendshipUserB.doc;
		var conversation = results.conversation.doc;

	    if (!friend)
	    {
	    	errors += 'eDBNotFound;';
	    }

	    if (!errors)
	    {
			if (friendshipUserA.friends.indexOf(friend._id) > -1)
			{
				errors += "eDBExists;";
			}
			
			if (friendshipUserB.friends.indexOf(friend._id) > -1)
			{
				errors += "eDBExists;";
			}

			if (errors)
			{
				return res.send({errors: errors});
			}

			if (friend)
			{
				var indexFriendshipUserA = friendshipUserA.sentRequests.indexOf(friend._id);
				var indexFriendshipUserB = friendshipUserB.receivedRequests.indexOf(friend._id);

				if (indexFriendshipUserA > -1)
				{
					friendshipUserA.sentRequests.splice(indexFriendshipUserA, 1);
				}

				if (indexFriendshipUserB > -1)
				{
					friendshipUserB.receivedRequests.splice(indexFriendshipUserB, 1);
				}


				friendshipUserA.friends.push(friend._id);
				friendshipUserB.friends.push(friend._id);
				friend.accepted = true;

				if (messengerA.conversations.indexOf(conversation._id) > -1)
				{
					messengerA.conversations.conversations.push(conversation._id);
				}
				if (messengerB.conversations.indexOf(conversation._id) > -1)
				{
					messengerB.conversations.conversations.push(conversation._id);
				}

				errors += errorAdapter(models.Messenger.modelName, messengerA.validateSync());
				errors += errorAdapter(models.Messenger.modelName, messengerB.validateSync());
				errors += errorAdapter(models.Friend.modelName, friend.validateSync());
				errors += errorAdapter(models.Friendship.modelName, friendshipUserA.validateSync());
				errors += errorAdapter(models.Friendship.modelName, friendshipUserB.validateSync());
				errors += errorAdapter(models.Conversation.modelName, conversation.validateSync());

				if (!errors)
				{
					var data = {
						messengerA: messengerA,
						messengerB: messengerB,
						friend: friend,
						friendshipUserA: friendshipUserA,
						friendshipUserB: friendshipUserB,
						conversation: conversation
					};
					
					saveFriend(data, function (errors, output) {
						errors += errors;
						//if (!errors)
						//{

						//}
						//else
						//{
						return res.send({errors: errors, output: output});
						//}
					});
				}
				else
				{
					return res.send({errors: errors});
				}
			}
			else
			{
				errors += 'eDBNotFound;';
				return res.send({errors: errors});
			}
		}
		else
		{
			return res.send({errors: errors});
		}
	});
});

//localhost:4080/api/task/send/message/56dccd1d616cc7fd0758a614/56dcd85d158576080958f911/meencanta
router.get('/send/message/:idUser/:idConversation/:content', function (req, res) {
    var idUser = req.params.idUser;
    var idConversation = req.params.idConversation;
    var content = req.params.content.trim();

    async.parallel({
        conversation: function(callback) {
            setTimeout(function(){
                models.Conversation
                .findOne({_id: idConversation})
                .exec(function (err, doc) {
                  // Need to be validated
                  callback(null, {errors: errorAdapter(models.Conversation.modelName, err), doc: doc});

                });
            }, 200)
        },
        message: function(callback) {
            setTimeout(function(){
            	var message = new models.Message();
                callback(null, {errors: errorAdapter(models.Message.modelName, message.validateSync()), doc: message});
            }, 200)
        }
  },
  function(err, results) {
	    var errors = "";
	    errors += results.conversation.errors;
	    errors += results.message.errors;

		var conversation = results.conversation.doc;
		var message = results.message.doc;

	    if (!conversation)
	    {
	    	errors += "eDBNotFound;";
	    }
	    else
	    {
	    	if (conversation.participants.indexOf(idUser) == -1)
	    	{
	    		errors += "eDBNotFound;";
	    	}
	    }

	    if (!errors)
	    {
	    	message._user = idUser;
	    	message._conversation = conversation._id;
			message.content = content;
			conversation.messages.push(message._id);

			errors += errorAdapter(models.Message.modelName, message.validateSync());
			errors += errorAdapter(models.Conversation.modelName, conversation.validateSync());
			if (!errors)
			{
				var data = {
					conversation: conversation,
					message: message
				};

				saveMessage(data, function (errors, output) {
					errors += errors;
					//if (!errors)
					//{

					//}
					//else
					//{
					return res.send({errors: errors, output: output});
					//}
				});
			}
			else
			{
				return res.send({errors: errors});
			}
		}
		else
		{
			return res.send({errors: errors});
		}
	});
});

module.exports = router;