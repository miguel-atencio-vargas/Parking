
const checkinCtrl = {};
const Car = require('../models/car');
const CheckIn = require('../models/checkIn');

checkinCtrl.renderSearchCheckinForm = (req, res) => {
	res.render('search-checkin');
};

checkinCtrl.checkinCar = async (req, res) => {
	const car = await Car.find({plate: req.body.plate}).lean();
	if(car.length > 0){
		res.render('new-car', { car: car[0] })
	}else{
		res.render('new-car', {
			plate: req.body.plate
		});
	}
};

checkinCtrl.createNewCar = async (req, res) => {
	let { plate, brand, owner, ownerPhone } = req.body;
	plate = plate.toUpperCase();
	const car = await Car.find({ plate });
	let newCheckIn;
	if(car.length > 0){
		console.log('La placa ya fue registrada anteriormente, se está registrando la entrada al parking.');
		newCheckIn = new CheckIn({ Car: car[0] });
	}else{
		console.log('Se creó un nuevo coche y se registro la entrada del mismo al parking');
		const newCar = new Car({ plate, brand, owner, ownerPhone });
		await newCar.save();
		newCheckIn = new CheckIn({ Car: newCar });
	}
	await newCheckIn.save();
	res.json({
		ok: true,
		newCheckIn
	});
};

module.exports = checkinCtrl;
