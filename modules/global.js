var port1 = 4080;
var port2 = 9000;
var port3 = 4443;
var port4 = 9443;

var ports = {'http': {
                        'web':        4080,
                        'io':         4080,
                        'peer':       4080
                     },
             'https': {
                        'web':        4443,
                        'io':         4443,
                        'peer':       4443
                      }
            };

var DEFAULT_LANGUAGE = 'en';
//var host_name = "https.tocandtalk.com";
var host_name = "192.168.0.134";
var users = [];
var availables = {};
var limit = 1;

var bd = {};
bd.user = [{
            "username"        : "sebastianfelipe",
            "name"            : "Sebastián Felipe",
            "lastname"        : "Torres Garfe",
            "sex"             : "Hombre",
            "email"           : "sebastian.felipe@tocandtalk.com",
            "password"        : "pass",
            "conf_password"   : "pass"
            },
            {
            "username"        : "felipemancilla",
            "name"            : "Felipe Alexis",
            "lastname"        : "Mancilla Sepúlveda",
            "sex"             : "Hombre",
            "email"           : "felipe.alexis@tocandtalk.com",
            "password"        : "pass",
            "conf_password"   : "pass"
            },
            {
             "username"       : 'victortorres',
             "name"           : 'Víctor',
             "lastname"       : 'Torres Varas',
             "sex"            : 'hombre',
             "email"          : 'victor.torresva@tocandtalk.com',
             "password"       : 'pass',
             "conf_password"  : 'pass'
            },
            {
             "username"      : 'blaze17',
             "name"           : 'Fabián',
             "lastname"       : 'Da Silva Retamales',
             "sex"            : 'hombre',
             "email"          : 'fabian.dasilva.12@tocandtalk.com',
             "password"       : 'pass',
             "conf_password"  : 'pass'
            },
            {
             "username"      : 'nibaldo',
             "name"           : 'Nibaldo',
             "lastname"       : 'González Salgado',
             "sex"            : 'hombre',
             "email"          : 'nibaldo.gonzalez@tocandtalk.com',
             "password"       : 'pass',
             "conf_password"  : 'pass'
             }
             ];

module.exports.bd = bd;
module.exports.users = users;
module.exports.availables = availables;
module.exports.limit = limit;
module.exports.port1 = port1;
module.exports.port2 = port2;
module.exports.port3 = port3;
module.exports.ports = ports;
module.exports.host_name = host_name;
module.exports.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE;