var authenticate = function (req,res,next) {
  console.log("req.session -> ");
  console.log(req.session);
  if (!req.session.username)
  {
    return res.render('login/index.html', {forceType: "desktop", errors: ""}); }
  
  else
  {
    return next();
  }
}

module.exports.authenticate = authenticate;