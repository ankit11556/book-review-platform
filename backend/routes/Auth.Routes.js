const express = require('express');
const router = express.Router();
const {signupController,loginController} = require('../controllers/Auth.controller')

router.post("/sign-up", signupController)
router.post("/login", loginController)

module.exports = router