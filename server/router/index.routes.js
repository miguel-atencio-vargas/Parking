const express = require('express');
const router = express.Router();

const { isAuthenticated } = require("../helpers/auth");
const { renderIndex } = require('../controllers/index.controller');
router.get('/', isAuthenticated, renderIndex);


module.exports = router;
