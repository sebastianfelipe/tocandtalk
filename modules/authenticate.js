var authenticate = function (req, res, next)
{
	if (req.session.user)
	{
		if (req.session.user._id)
		{
			return next();
		}
	}

	return res.redirect('/login');
}

var authenticateRegister = function (req, res, next)
{
	if (req.session.user)
	{
		if (req.session.user._id)
		{
			//next();
			return res.redirect('/');
		}
	}

	return next();
}

module.exports.authenticate = authenticate;
module.exports.authenticateRegister = authenticateRegister;