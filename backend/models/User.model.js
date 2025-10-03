const mongoose = require('mongoose');
const bacrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
},{timestamps: true})

//password hashed before store
userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bacrypt.hash(this.password,10);
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model('User',userSchema);
module.exports = User