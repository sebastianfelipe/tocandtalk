var authenticate = function (req, res, next)
{
	if (!req.session.username)
	{
		return res.redirect('/login');
		//return res.render('login/index.html', {forceType: "desktop", errors: ""});
	}
	else
	{
		return next();
	}
}

var authenticateRegister = function (req, res, next)
{
	if (req.session.username)
	{
		return res.redirect('/');
	}
	else
	{
		return next();
	}
}

module.exports.authenticate = authenticate;
module.exports.authenticateRegister = authenticateRegister;