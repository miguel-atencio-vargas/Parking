'user strict';
const express = require('express');
const router = express.Router();

const { renderSearchCheckinForm, checkinCar, createNewCar, renderSearchOutgoingForm, outgoingCar, registerOutgoingCar } = require('../controllers/checkin.controller');

const { checkField } = require('../middlewares/validator');
const { isAuthenticated } = require("../helpers/auth");

router.get('/checkin/search', isAuthenticated, renderSearchCheckinForm);
router.post('/checkin/search', isAuthenticated, checkinCar);
router.post('/checkin/new-car', isAuthenticated, checkField, createNewCar);

router.get('/outgoing/search', isAuthenticated, renderSearchOutgoingForm);
router.post('/outgoing/search',  isAuthenticated, outgoingCar);
router.post('/outgoing', isAuthenticated, registerOutgoingCar);

module.exports = router;
