'use strict'
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema, model } = require('mongoose');


let CheckInSchema = Schema({
    Car: {
		type: Schema.Types.ObjectId,
		ref: 'Car',
		required: [true, 'Se necesita el id de un coche para registrar la entrada del mismo']
	},
	Employed: {
		type: Schema.Types.ObjectId,
		ref: 'Employed',
		required: [false, 'El registro de un coche debe estar a cargo de un empleado']
	},
	timeCheckIn: {
		type: String,
		required: [true, 'La hora de ingreso es necesaria']
	},
	timeOutgoing: {
		type: String
	},
	total: Number,
	isInside: {
		type: Boolean,
		default: true
	},
	plate: {
		type: String,
		required: [true, 'La placa del coche es necesaria'],
		unique: false
	},
})

CheckInSchema.plugin(uniqueValidator, {
    message: '{PATH} del coche debe de ser único'
});
module.exports = mongoose.model('CheckIn', CheckInSchema);
