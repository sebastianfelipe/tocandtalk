var capitalize = require('string-capitalize');

var error_adapter = function(model_name, err) {
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

module.exports.error_adapter = error_adapter;
