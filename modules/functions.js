var capitalize = require('string-capitalize');
var nodemailer = require("nodemailer");
var crypto = require('crypto');

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
  }
  errorList.push('');
  return errorList.join(';');
}

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



module.exports.error_adapter = error_adapter;
module.exports.sendMail = sendMail;
module.exports.createCode = createCode;
module.exports.indexOfUser = indexOfUser;
module.exports.wasItAdded = wasItAdded;