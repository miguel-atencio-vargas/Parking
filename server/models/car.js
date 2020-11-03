
'use strict'
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema, model } = require('mongoose');

let CarSchema = Schema({
    plate: {
		type: String,
		required: [true, 'La placa del coche es necesaria'],
		unique: true
	},
	brand: {
		type: String,
		required: [true, 'La marca del coche es necesaria']
	},
	owner: {
		type: String,
		default: 'Sin nombre'
	},
	ownerPhone: {
		type: String,
		default: '00000000'
	},
	dateOfRegister: {
		type: Date,
		default: new Date()
	}
})


CarSchema.plugin(uniqueValidator, {
    message: '{PATH} del coche debe de ser único'
});
module.exports = mongoose.model('Car', CarSchema);
