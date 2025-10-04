const express = require('express');
const router = express.Router();
const {signupController} = require('../controllers/Auth.controller')

router.post("/sign-up", signupController)

module.exports = router
