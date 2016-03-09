var async = require('async');
var schema = require('../schema.js');
var models = require('../models.js');

// Module Imports
var functions_module = require('../../modules/functions.js');
var encrypt_module = require('./encrypt.js');

// Functions Imports
var errorAdapter = functions_module.error_adapter;
var createCode = functions_module.createCode;
var hashPassword = encrypt_module.hashPassword;

var saveClassicAccount = function (data, callback) {
  var user = data.user;
  var username = data.username;
  var email = data.email;
  var appraisement = data.appraisement;
  var messenger = data.messenger;
  var friendship = data.friendship;
  var password = data.password;
  var auth = data.auth;
  var timeout = 200;
  
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
            user.save(function (err) {
                callback(null, {errors: errorAdapter(models.User.modelName, err), doc: user})
            });
          }, timeout);
      },
      username: function(callback) {
          setTimeout(function(){
            username.save(function (err) {
                callback(null, {errors: errorAdapter(models.Username.modelName, err), doc: username})
            });
          }, timeout);
      },
      email: function(callback) {
          setTimeout(function(){
            email.save(function (err) {
                callback(null, {errors: errorAdapter(models.Email.modelName, err), doc: email})
            });
          }, timeout);
      },
      password: function(callback) {
          setTimeout(function(){
            password.save(function (err) {
                callback(null, {errors: errorAdapter(models.Password.modelName, err), doc: password})
            });
          }, timeout);
      },
      appraisement: function(callback) {
          setTimeout(function(){
            appraisement.save(function (err) {
                callback(null, {errors: errorAdapter(models.Appraisement.modelName, err), doc: appraisement})
            });
          }, timeout);
      },
      messenger: function(callback) {
          setTimeout(function(){
            messenger.save(function (err) {
                callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: messenger})
            });
          }, timeout);
      },
      friendship: function(callback) {
          setTimeout(function(){
            friendship.save(function (err) {
                callback(null, {errors: errorAdapter(models.Friendship.modelName, err), doc: friendship})
            });
          }, timeout);
      },
      auth: function(callback) {
          setTimeout(function(){
            auth.save(function (err) {
                callback(null, {errors: errorAdapter(models.Auth.modelName, err), doc: auth})
            });
          }, timeout);
      } 
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    var errors = "";
    errors += results.user.errors;
    errors += results.username.errors;
    errors += results.email.errors;
    errors += results.password.errors;
    errors += results.appraisement.errors;
    errors += results.messenger.errors;
    errors += results.friendship.errors;
    errors += results.auth.errors;
    //----------------------------------
    
    var output = {
            username: results.username.doc,
            email: results.email.doc,
            password: results.password.doc,
            messenger: results.messenger.doc,
            appraisement: results.appraisement.doc,
            friendship: results.friendship.doc,
            user: results.user.doc,
            auth: results.auth.doc
          };
    callback(errors, output);
  });
}
//---------------------------------------------

var saveSocialAccount = function (data, callback) {
  var user = data.user;
  var appraisement = data.appraisement;
  var messenger = data.messenger;
  var friendship = data.friendship;
  var auth = data.auth;
  var timeout = 200;
  
  async.parallel({
      user: function(callback) {
          setTimeout(function(){
            user.save(function (err) {
                callback(null, {errors: errorAdapter(models.User.modelName, err), doc: user})
            });
          }, timeout);
      },
      appraisement: function(callback) {
          setTimeout(function(){
            appraisement.save(function (err) {
                callback(null, {errors: errorAdapter(models.Appraisement.modelName, err), doc: appraisement})
            });
          }, timeout);
      },
      messenger: function(callback) {
          setTimeout(function(){
            messenger.save(function (err) {
                callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: messenger})
            });
          }, timeout);
      },
      friendship: function(callback) {
          setTimeout(function(){
            friendship.save(function (err) {
                callback(null, {errors: errorAdapter(models.Friendship.modelName, err), doc: friendship})
            });
          }, timeout);
      },
      auth: function(callback) {
          setTimeout(function(){
            auth.save(function (err) {
                callback(null, {errors: errorAdapter(models.Auth.modelName, err), doc: auth})
            });
          }, timeout);
      } 
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    var errors = "";
    errors += results.appraisement.errors;
    errors += results.messenger.errors;
    errors += results.friendship.errors;
    errors += results.user.errors;
    errors += results.auth.errors;
    //----------------------------------
    
    var output = {
            user: results.user.doc,
            appraisement: results.appraisement.doc,
            messenger: results.messenger.doc,
            friendship: results.friendship.doc,
            auth: results.auth.doc
          };
    callback(errors, output);
  });
};

var saveFriendRequest = function (data, callback) {
  var friend = data.friend;
  var friendshipUserA = data.friendshipUserA;
  var friendshipUserB = data.friendshipUserB;

  async.parallel({
      friend: function(callback) {
          setTimeout(function(){
            friend.save(function (err) {
                callback(null, {errors: errorAdapter(models.Friend.modelName, err), doc: friend})
            });
          }, 200);
      },
      friendshipUserA: function(callback) {
          setTimeout(function(){
            friendshipUserA.save(function (err) {
                callback(null, {errors: errorAdapter(models.Friendship.modelName, err), doc: friendshipUserA})
            });
          }, 200);
      },
      friendshipUserB: function(callback) {
          setTimeout(function(){
            friendshipUserB.save(function (err) {
              //console.log("There is an error");
              //console.log(err);
                callback(null, {errors: errorAdapter(models.Friendship.modelName, err), doc: friendshipUserB})
            });
          }, 200);
      }
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    var errors = "";
    errors += results.friend.errors;
    errors += results.friendshipUserA.errors;
    errors += results.friendshipUserB.errors;

    //----------------------------------
    
    var output = {
            friend: results.friend.doc,
            friendshipUserA: results.friendshipUserA.doc,
            friendshipUserB: results.friendshipUserB.doc
          };
    callback(errors, output);
  });
};

var saveFriend = function (data, callback) {
  var messengerA = data.messengerA;
  var messengerB = data.messengerB;
  var friend = data.friend;
  var friendshipUserA = data.friendshipUserA;
  var friendshipUserB = data.friendshipUserB;
  var conversation = data.conversation;

  async.parallel({
      messengerA: function(callback) {
          setTimeout(function(){
            messengerA.save(function (err) {
                callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: messengerA})
            });
          }, 200);
      },
      messengerB: function(callback) {
          setTimeout(function(){
            messengerB.save(function (err) {
                callback(null, {errors: errorAdapter(models.Messenger.modelName, err), doc: messengerB})
            });
          }, 200);
      },
      friend: function(callback) {
          setTimeout(function(){
            friend.save(function (err) {
                callback(null, {errors: errorAdapter(models.Friend.modelName, err), doc: friend})
            });
          }, 200);
      },
      friendshipUserA: function(callback) {
          setTimeout(function(){
            friendshipUserA.save(function (err) {
                callback(null, {errors: errorAdapter(models.Friendship.modelName, err), doc: friendshipUserA})
            });
          }, 200);
      },
      friendshipUserB: function(callback) {
          setTimeout(function(){
            friendshipUserB.save(function (err) {
              //console.log("There is an error");
              //console.log(err);
                callback(null, {errors: errorAdapter(models.Friendship.modelName, err), doc: friendshipUserB})
            });
          }, 200);
      },
      conversation: function(callback) {
          setTimeout(function(){
            conversation.save(function (err) {
              //console.log("There is an error");
              //console.log(err);
                callback(null, {errors: errorAdapter(models.Conversation.modelName, err), doc: conversation})
            });
          }, 200);
      }
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    var errors = "";
    errors += results.messengerA.errors;
    errors += results.messengerB.errors;
    errors += results.friend.errors;
    errors += results.friendshipUserA.errors;
    errors += results.friendshipUserB.errors;
    errors += results.conversation.errors;

    //----------------------------------
    
    var output = {
            messengerA: results.messengerA.doc,
            messengerB: results.messengerB.doc,
            friend: results.friend.doc,
            friendshipUserA: results.friendshipUserA.doc,
            friendshipUserB: results.friendshipUserB.doc,
            conversation: results.conversation.doc
          };
    callback(errors, output);
  });
};

var saveMessage = function (data, callback) {
  var conversation = data.conversation;
  var message = data.message;

  async.parallel({
      conversation: function(callback) {
          setTimeout(function(){
            conversation.save(function (err) {
                callback(null, {errors: errorAdapter(models.Conversation.modelName, err), doc: conversation})
            });
          }, 200);
      },
      message: function(callback) {
          setTimeout(function(){
            message.save(function (err) {
                callback(null, {errors: errorAdapter(models.Message.modelName, err), doc: message})
            });
          }, 200);
      }
  },
  function(err, results) {
    //----------------------------------
    // Si hay un error devolver error
    var errors = "";
    errors += results.conversation.errors;
    errors += results.message.errors;

    //----------------------------------
    
    var output = {
            message: results.message.doc,
            conversation: results.conversation.doc
          };
    callback(errors, output);
  });
};

module.exports = {}

module.exports.saveClassicAccount = saveClassicAccount;
module.exports.saveSocialAccount = saveSocialAccount;
module.exports.saveFriendRequest = saveFriendRequest;
module.exports.saveFriend = saveFriend;
module.exports.saveMessage = saveMessage;
