// getting-started.js
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validate = require('mongoose-validate');

// Types
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = {};

schema.username = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validate.alphanumeric, 'pattern']
    }
});

schema.email = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validate.email, 'pattern']
    },
    verified: { 
       type: Boolean
       },
    code: {
        type: String,
        validate: [validate.alphanumeric, 'pattern']
 }
});

schema.country = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }
});

schema.language = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    }
});

schema.user = mongoose.Schema({
    _username: {
        type: ObjectId,
        ref: 'Username'
    },
    _email: {
        type: ObjectId,
        ref: 'Email'
    },
    _nationality: {
        type: ObjectId,
        ref: 'Country'
},
    _nativeLanguage: {
        type: ObjectId,
        ref: 'Language'
},
    spokenLanguages: [{type: ObjectId, ref: 'Language'}],
    interestLanguages:  [{type: ObjectId, ref: 'Language'}],
    firstName: { type: String,
                required: true,
                trim: true,
                lowercase: true,
                validate: [validate.alpha, 'pattern']
},
    lastName: { type: String,
                required: true,
                trim: true,
                lowercase: true,
                validate: [validate.alpha, 'pattern']
},
    password: { type: String,
                required: true,
                trim: true,
                validate: [validate.alphanumeric, 'pattern']
},
    sex: {
        type: Boolean,
        required: true
        },
    description: {
                type: String,
                maxlength: 250
},
    _appraisement: {
                type: ObjectId,
                ref: 'Appraisement'
},
    _messenger: {
                type: ObjectId,
                ref: 'Messenger'
}
});

schema.appreciation = mongoose.Schema({
    _appraisement: {
                type: ObjectId,
                ref: 'Appraisement'
    },
  comment: {
            type: String,
            maxlength: 125,
            trim: true
},
   punctuation: {
            type: Number,
            min: 1,
            max: 5
}
});

schema.appraisement = mongoose.Schema({
    _user: {
            type: ObjectId,
            ref: 'User'
    },
   appreciations: [{
            type: ObjectId,
            ref: 'Appreciation'
}],
   mean: {type: Number}
});

schema.message = mongoose.Schema({
    _conversation: {
            type: ObjectId,
            ref: 'Conversation'
    },
  content: {
            type: String,
            maxlength: 125,
            trim: true
},
});

schema.conversation = mongoose.Schema({
    participants: [{
                   type: ObjectId,
                    ref: 'User'
    }],
   group: {type: Boolean},
   messages: [{
                type: ObjectId,
                ref: 'Message'
}]
});

schema.messenger = mongoose.Schema({
    _user: {
            type: ObjectId,
            ref: 'User'
    },
    conversations: [{
                type: ObjectId,
                ref: 'Conversation'
}]
});

schema.tUser = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    nationality: {type: ObjectId, ref: 'Country'},
    languages: [{type: ObjectId, unique: true, ref: 'Language'}]
});

schema.username.plugin(uniqueValidator, {message: 'unique'});
schema.email.plugin(uniqueValidator, {message: 'unique'});
schema.country.plugin(uniqueValidator, {message: 'unique'});
schema.language.plugin(uniqueValidator, {message: 'unique'});
schema.user.plugin(uniqueValidator, {message: 'unique'});

schema.messenger.plugin(uniqueValidator, {message: 'unique'});
schema.conversation.plugin(uniqueValidator, {message: 'unique'});
schema.message.plugin(uniqueValidator, {message: 'unique'});
schema.appraisement.plugin(uniqueValidator, {message: 'unique'});
schema.appreciation.plugin(uniqueValidator, {message: 'unique'});

schema.tUser.plugin(uniqueValidator, {message: 'unique'});

module.exports = schema;
