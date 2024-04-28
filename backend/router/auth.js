// auth.js

const express = require('express');
const router = express.Router();
const  createNewUser  = require('../controller/auth.controller');
const logoutController = require('../controller/logoutController');

router.post('/signup', createNewUser);
router.get('/logout',logoutController)

module.exports = router;
