var nodemailer = require("nodemailer");
var crypto = require('crypto');


var buf = crypto.randomBytes(16);
var identifier = buf.toString('hex');
var hash = crypto.createHash('md5').update(identifier).digest('hex');
console.log(hash);

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

var email = "fernando.dasilva@alumnos.usm.cl"; 

var mailOptions = {
  from: "tocandtalk <tocantalk@gmail.com>",
  to: "fernando.dasilva@alumnos.usm.cl",
  subject: "Bitch!",
  text: 'We need methylamine!',
  html: 'https://tocandtalk.com/verify.php?email='+email+'&hash='+hash
};

smtpTransport.sendMail(mailOptions, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
  smtpTransport.close();
});
