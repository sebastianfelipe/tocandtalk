var authenticate = function (req, res, next)
{
	if (req.session.user)
	{
		if (req.session.user._id)
		{
			next();
			//return res.render('login/index.html', {forceType: "desktop", errors: ""});
		}
		else
		{
			return res.redirect('/login');
		}
	}
	else
	{
		return res.redirect('/login');
	}
}

var authenticateRegister = function (req, res, next)
{
	if (req.session.user)
	{
		if (req.session.user._id)
		{
			next();
			//return res.render('login/index.html', {forceType: "desktop", errors: ""});
		}
		else
		{
			return res.redirect('/');
		}
	}
	else
	{
		return res.redirect('/');
	}
}

module.exports.authenticate = authenticate;
module.exports.authenticateRegister = authenticateRegister;