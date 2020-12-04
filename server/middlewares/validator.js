'use strict'

const { body, check, validationResult } = require('express-validator');
require('../config');
const CODE = process.env.CODE;
const Employed = require('../models/employed');

//1. Primero revisar que los campos no esten vacios
exports.checkField = [
	body('*', 'no puede estar vacio').not().isEmpty(),
	function(req, res, next){
		const errors = validationResult(req).array();
		if( errors.length !== 0 ){
			res.render( 'new-car', {
				car: req.body,
				errors
			})
		}else{
			next() // ir al siguiente middleware
		}
	}
]
exports.checkFieldSignup = [
	body('*', 'no puede estar vacio').not().isEmpty(),
	function(req, res, next){
		const errors = validationResult(req).array();
		if( errors.length !== 0 ){
			res.render( 'signup', {
				employed: req.body,
				errors
			})
		}else{
			next() // ir al siguiente middleware
		}
	}
]
//2. Revisar que el codigo sea incorrecto
//  codigo
exports.checkCodeRegister = [
	body('code').custom(code => {
		if(code !== CODE) throw new Error('es incorrecto.')
		else return true
	}), function(req, res, next) {
		const errors = validationResult(req).array();
		if( errors.length !== 0 ){
			res.render( 'signup', {
				title: 'Revise el código',
				employed: req.body,
				errors
			})
		}else{
			next() // ir al siguiente controlador.
		}
	}
]
//3. Revisar que el correo no este en uso(1ra validacion asi se evita gasto de procesamiento)
// TODO: Si ya esta en uso dar la opcion de recuperar contraseña.
exports.checkCiCoincidence = [
	check('CI').custom((value) => {
		const query = Employed.find({ CI: value});
		return query.lean().exec().then(employed => {
			if (employed.length > 0) {
				return Promise.reject('ya se encuentra en uso.');
			}
		})
	}), function(req, res, next){
		const errors = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render( 'signup', {
				title: 'El numero de carnet ya está en uso',
				employed: req.body,
				errors
			})
		}else{
			next() // ir al siguiente controlador.
		}
	}
]
//4. Revisar que la contraseña cumple con los requisitos
exports.checkPasswordMin = [
	body('password', 'no cumple con los requisitos necesarios.')
	.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
	function(req, res, next){
		const errors  = validationResult(req).array();
		if( errors.length !== 0 ){
			res.render( 'signup', {
				title: 'Revise la contraseña',
				employed: req.body,
				errors
			})
		}else{
			next() // ir al siguiente controlador.
		}
	}
]
//5. Revisar que las contraseñas sean iguales
exports.checkConfirm = [
	check('password').custom((password, { req }) => {
		if(password !== req.body.confirm)
			throw new Error('no coincide con la confirmación de la contraseña.')
		else
			return true
	}), function(req, res, next){
		const errors = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render( 'signup', {
				title: 'Las contraseñas no coinciden',
				employed: req.body,
				errors
			})
		}else{
			delete req.body.confirm
			next() // ir al controlador.
		}
	}
]
