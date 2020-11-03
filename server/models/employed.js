'use strict'
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema, model } = require('mongoose');


let EmployedSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'El nombre es necesario']
	},
	lastName: {
		type: String,
		required: [true, 'El apellido es necesario']
	},
	CI: {
		type: String,
		required: [true, 'El numero de cartner es necesario'],
		unique: true
	},
	phone: {
		type: String
		unique: true
	},
	startingTime: {
		type: Date
	},
	finishingTime: {
		type: Date
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'El email es necesario para crear la cuenta de administrador']
	},
	password: {
		type: String,
		required: [true, 'Es necesario una contraseña']
	},
	dateOfHire: {
		type: Date,
		default: new Date()
	},
	salary: {
		type: Double,
		required: [true, 'El salario es necesario']
	}
})


EmployedSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(11);
	return await bcrypt.hash(password, salt);
}

EmployedSchema.methods.verifyPassword = async function(password) {
	return await bcrypt.compare(password, this.password);
}

//metodo para borrar el atributo password
EmployedSchema.methods.toJSON = function () {
	let admin = this
	let adminObject = admin.toObject()
	delete adminObject.password
	return adminObject
}
//error cuando los datos tienen que ser unicos
EmployedSchema.plugin(uniqueValidator, {
	message: 'debe de ser único'
});

module.exports = model('Employed', EmployedSchema);
