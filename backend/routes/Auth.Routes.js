const express = require('express');
const router = express.Router();
const {signupController,loginController} = require('../controllers/Auth.controller')
const {protect} = require("../middlewares/Auth.middleware")

router.post("/sign-up", signupController)
router.post("/login", loginController)

router.get("/check-auth",protect,(req,res)=>{
  res.json({user: req.user})
})

module.exports = router