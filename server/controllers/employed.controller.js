'use strict';

const passport = require('passport');
const Employed = require('../models/employed');

require('../config');

const employedCtrl = {};


employedCtrl.renderSignUpForm = (req, res, next)  => {
	res.render('signup', {
		title: 'Registrar nuevo trabajador'
	});
}


employedCtrl.signup = async (req, res, next) => {
	try {
		const { body } = req;
		const newEmployed = new Employed(body);
		newEmployed.password = await newEmployed.encryptPassword(body.password);
		await newEmployed.save();
		console.log(newEmployed);
		res.json({ //TODO: ir a una pagina de perfil
			ok: true,
			message: "Nuevo trabajador creado!",
			newEmployed
		});
	} catch (error) {
		return next(error);
	}
}

employedCtrl.renderSigninForm = (req, res, next) => {
	res.render('signin', {
		title: 'Inicie Sesión como trabajador'
	})
}

// afds@435345jlA
employedCtrl.signin = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/employed/signin',
	failureFlash: true
});

employedCtrl.logout = (req, res) => {
	req.logout();
	req.flash('success_msg', 'Ha cerrado sesion.');
	res.redirect('login');
};


module.exports = employedCtrl;
