var error_adapter = function(model_name, err) {
  error_list = [];
  if (err) {
    var errors = err.errors;
    for (var key in errors) {
      var pieces = [key, errors[key].kind]
      error = 'error_' + model_name.toLowerCase();
      for (var piece in pieces) {
        error += '_' + pieces[piece].replace(' ','').replace('userdefined', errors[key].message);
      }
      error_list.push(error);
    }
  }
  error_list.push('');
  return error_list.join(';');
}

module.exports.error_adapter = error_adapter;
