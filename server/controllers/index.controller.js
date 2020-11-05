const indexCtrl = {};

const moment = require('moment');
const CheckIn = require('../models/checkIn');
indexCtrl.renderIndex = async (req, res) => {
	const checkIns = await CheckIn.find({isInside: true});
	checkIns.forEach((item) => {
		item.timeCheckIn = moment(item.timeCheckIn).format('LLLL');
	});

	res.render('index', { checkIns });
};

module.exports = indexCtrl;
