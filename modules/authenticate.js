var authenticate = function (req, res, next)
{
	if (!req.session._id)
	{
		return res.redirect('/login');
		//return res.render('login/index.html', {forceType: "desktop", errors: ""});
	}
	else
	{
		next();
	}
}

var authenticateRegister = function (req, res, next)
{
	if (req.session._id)
	{
		return res.redirect('/');
	}
	else
	{
		next();
	}
}

module.exports.authenticate = authenticate;
module.exports.authenticateRegister = authenticateRegister;