'use strict';
const express = require('express');
const router = express.Router();

const { checkCodeRegister, checkField, checkFieldSignup, checkCiCoincidence, checkPasswordMin, checkConfirm } = require('../middlewares/validator');

const { renderSignUpForm, signup, renderSigninForm, signin, logout } = require('../controllers/employed.controller');


router.get('/employed/signup', renderSignUpForm);
router.post('/employed/signup', checkFieldSignup, checkCodeRegister, checkCiCoincidence, checkPasswordMin, checkConfirm, signup);

router.get('/employed/signin', renderSigninForm);
router.post('/employed/signin', signin);

router.get('/employed/logout', logout);



module.exports = router;
