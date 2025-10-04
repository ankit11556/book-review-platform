const User = require("../models/User.model");

// signUp controller
exports.signupController = async (req,res) => {
  try {
    const {name, email, password} = req.body;
    const existUser = await User.findOne({email})
    
    if (existUser) {
      return res.status(400).json({message: "user already exists"});
    }

    const user = await User.create({name, email, password});
    res.status(201).json({message: "SignUp successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}