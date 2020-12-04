const indexCtrl = {};

const moment = require('moment');
const CheckIn = require('../models/checkIn');
require('../config');
const MAX = process.env.MAX;


indexCtrl.renderIndex = async (req, res) => {
	const checkIns = await CheckIn.find({isInside: true});

	checkIns.forEach((item) => {
		item.timeCheckIn = moment(item.timeCheckIn).format('LLLL');
	});
	const carsInside = MAX - checkIns.length;
	res.render('index', {
		checkIns,
		carsInside
	});
};

module.exports = indexCtrl;
