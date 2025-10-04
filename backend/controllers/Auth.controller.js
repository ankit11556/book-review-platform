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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

//login controller
exports.loginController = async (req,res) => {
  try {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({message: "User not found. Please Sign-Up first"})
    }

    // check password     
    const isMatchPassword = await user.isComparePassword(password);
    if (!isMatchPassword) {
      return res.status(403).json({message: "Invalid credentials"})
    }

    res.status(201).json({message: "login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
     res.status(500).json({message: 'login failed',error: error.message})
  }
}