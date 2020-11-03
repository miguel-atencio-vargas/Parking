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
		type: Date,
		default: new Date()
	},
	timeOutgoing: {
		type: Date
	},
	total: Number
})

CheckInSchema.plugin(uniqueValidator, {
    message: '{PATH} del coche debe de ser único'
});
module.exports = mongoose.model('CheckIn', CheckInSchema);
