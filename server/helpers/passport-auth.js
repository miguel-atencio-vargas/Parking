const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Employed = require('../models/employed');


passport.use(new LocalStrategy({
	usernameField: 'CI',
	passwordField: 'password'
}, async ( CI, password, done ) => {
	const employedDB = await Employed.findOne({ CI });
	if( employedDB ){
		const match = await employedDB.verifyPassword(password);
		if ( match ) {
			return done(null, employedDB, { message: `Bienvenido ${employedDB.firstName}.` });
		} else {
			return done(null, false, { message: '(CI o) contraseña incorrecta.' });
		}
	}
	return done(null, false, { message: 'CI (o contraseña) incorrecto.' });
}));

passport.serializeUser((employed, done) => {
	//console.log('serializeUser: ', employed);
	done(null, employed.id);
});

passport.deserializeUser((id, done) => {
	Employed.findById(id, (err, employed) => {
		//console.log('deserializeUser: ', employed);
		done(err, employed);
	});
});
