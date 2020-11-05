const moment = require('moment');
const checkinCtrl = {};
const Car = require('../models/car');
const CheckIn = require('../models/checkIn');
moment.locale('es');

checkinCtrl.renderSearchCheckinForm = (req, res) => {
	res.render('search', {type : 'checkin'});
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
	let newCheckIn;
	const car = await Car.find({ plate });
	if( car.length > 0 ){
		if(plate != car[0].plate || brand != car[0].brand || owner != car[0].ownerPhone){
			await Car.findOneAndUpdate({ plate }, { brand: brand, owner: owner, ownerPhone: ownerPhone });
		}
		const checkIns = await CheckIn.find({ plate }).sort({timeCheckIn: -1});
		if( checkIns.length > 0 ){
			if( checkIns[0].isInside ){
				res.json({ok: true, message: 'El auto con esa placa se encuentra dentro del parqueo.'});
			}else{
				newCheckIn = new CheckIn({ Car: car[0] , plate, timeCheckIn: moment()});
				await newCheckIn.save();
				res.json({ok: true, message: 'Se ha registrado la entrada del vehiculo'});
			}
		}else{
			const newCar = new Car({ plate, brand, owner, ownerPhone });
			newCheckIn = new CheckIn({ Car: newCar, plate: newCar.plate, timeCheckIn: moment() });
			await newCheckIn.save();
			res.json({ok: true, message: 'Se registro la entrada del vehiculo al parking'})
		}
	}else{
		const newCar = new Car({ plate, brand, owner, ownerPhone });
		await newCar.save();
		newCheckIn = new CheckIn({ Car: newCar, plate: newCar.plate, timeCheckIn: moment() });
		await newCheckIn.save();
		res.json({ok: true, message: 'Se creó un nuevo coche y se registro la entrada del mismo al parking'})
	}
};


checkinCtrl.renderSearchOutgoingForm = (req, res) => {
	res.render('search', {type: 'outgoing'});
};

checkinCtrl.outgoingCar = async(req, res) => {
	const plate = req.body.plate;
	const checkIn = await CheckIn.findOne({plate, isInside: true}).populate('Car');
	if( checkIn ){
		const dateCheckIn = checkIn.timeCheckIn;
		const now = moment();
		const data = moment.duration(now.diff(dateCheckIn));
		res.render('details-car', {
			ObjectId: checkIn._id,
			plate: checkIn.plate,
			owner: checkIn.Car.owner,
			ownerPhone: checkIn.Car.ownerPhone,
			brand: checkIn.Car.brand,
			timeCheckIn: moment(dateCheckIn).format('LLLL'),
			data: data._data,
			timeOutgoingHumanizable: now.format('LLLL'),
			timeOutgoing: now
		});
	}else{
		res.json({ok: true, message: 'no se ha encontrado ningun vehiculo con esa placa'})
	}
};

checkinCtrl.registerOutgoingCar = async (req, res) => {
	const _id = req.body._id;
	const timeOutgoing = req.body.timeOutgoing;
	const checkIn = await CheckIn.findOneAndUpdate({ _id }, {isInside: false, timeOutgoing});
	res.json({ok: true, message: 'Se registro la salida del coche con placa: '});
};

module.exports = checkinCtrl;
