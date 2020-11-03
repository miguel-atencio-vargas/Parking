const express = require('express');
const router = express.Router();

const { renderSearchCheckinForm, checkinCar, createNewCar } = require('../controllers/checkin.controller');

const { check_field } = require('../middlewares/validator');

router.get('/checkin/search', renderSearchCheckinForm);
router.post('/checkin/search', checkinCar);
router.post('/checkin/new-car', check_field, createNewCar);

module.exports = router;
