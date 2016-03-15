var capitalize = require('string-capitalize');
var nodemailer = require("nodemailer");
var crypto = require('crypto');
var DEFAULT_LANGUAGE = require('./global.js').DEFAULT_LANGUAGE;

var async = require('async');
var models = require('../database/models.js');

var error_adapter = function (model_name, err) {
  errorList = [];
  if (err) {
    var errors = err.errors;
    for (var key in errors) {
      var pieces = [key, errors[key].kind]
      error = 'e' + capitalize(model_name);
      for (var piece in pieces) {
        error += capitalize(pieces[piece].replace(' ','').replace('userdefined', errors[key].message));
      }
      errorList.push(error);
    }
    //errorList.push("eDBErrorAdapter;");
  }
  errorList.push('');
  return errorList.join(';');
}

var authenticateUser = function (req, user)
{
  //var lang = DEFAULT_LANGUAGE;
  req.session.user = {};
  req.session.user._id = user._id;
  req.session.user._appraisement = user._appraisement;
  req.session.user._messenger = user._messenger;
  req.session.user._friendship = user._friendship;
  req.session.user.lang = user._lang;

  if (!req.session.meta)
  {
    req.session.meta = {};
  }

  req.session.meta.lang = req.session.user.lang;
};

var signOut = function (req, user)
{
  delete req.session.user._id;
  delete req.session.user._appraisement;
  delete req.session.user._messenger;
  delete req.session.user._friendship;
  delete req.session.user.lang;
  delete req.session.user;
  return;
};

var setPageLang = function (req, res, next)
{
  if (req.session.meta)
  {
    if (req.session.meta.lang)
    {
      return next();
    }
  }
  else
  {
    req.session.meta = {};
  }

  async.parallel({
      lang: function(callback){
            setTimeout(function(){
              models.Lang.findOne({code: DEFAULT_LANGUAGE}).sort([['name', 1]]).exec(function (err, doc) {
                  var results = {errors: err, doc: doc}
                  callback(null, results);
                });
            }, 200);
        }
  },
  function (err, results)
  {
    req.session.meta.lang = results.lang.doc;
    return next();
  });
};

var createCode = function () {
  var buf = crypto.randomBytes(32);
  var identifier = buf.toString('hex');
  var hash = crypto.createHash('md5').update(identifier).digest('hex');
  return hash;
}

var sendMail = function (email) { 
  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      XOAuth2: {
        user: "tocandtalk@gmail.com", // Your gmail address.
                                            // Not @developer.gserviceaccount.com
        clientId: "1039309719411-bnse686g4vp3s0glv2anj6ol5tih9hu1.apps.googleusercontent.com",
        clientSecret: "Kif8tklu0gf5egZmJap_41NY",
        refreshToken: "1/T0X4dRQHevf-w0OHsX2cUi7Hhv5E9_rat1yGXYZzNfkMEudVrK5jSpoR30zcRFq6"
      }
    }
  });

  var mailOptions = {
    from: "tocandtalk <tocantalk@gmail.com>",
    to: email.email,
    subject: "Bitch!",
    text: 'We need methylamine!',
    html: 'https://https.tocandtalk.com/api/verify/email/'+email.email+'/'+email.code
  };

  console.log(email);
  console.log(mailOptions);
  
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
    }
    smtpTransport.close();
  });
}

var indexOfUser = function (availables, userId, language) {
  for (var i = 0; i < availables[language].length; i++)
  {
    if (availables[language][i].userId == userId)
    {
      return i;
    }
  }
  return -1;
};

var wasItAdded = function (availables, userId, language) {
  if (indexOfUser(availables, userId, language) > -1)
  {
    return true;
  }
  return false;
};

var access = function (req, res, next)
{
  console.log("Access :D");
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
};

module.exports.error_adapter = error_adapter;
module.exports.authenticateUser = authenticateUser;
module.exports.signOut = signOut;
module.exports.sendMail = sendMail;
module.exports.setPageLang = setPageLang;
module.exports.createCode = createCode;
module.exports.indexOfUser = indexOfUser;
module.exports.wasItAdded = wasItAdded;
module.exports.access = access;