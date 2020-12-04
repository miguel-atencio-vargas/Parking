const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error_msg', 'Debe iniciar sesión para ver los datos del parqueo');
	res.redirect('/employed/signin');
};

module.exports = helpers;
