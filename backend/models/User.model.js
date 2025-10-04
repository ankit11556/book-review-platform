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

//password compare before login
userSchema.methods.isComparePassword = async function (password) {
  try {
    return await bacrypt.compare(password,this.password)
  } catch (error) {
     throw new Error("password comparision failed");
  }
}

const User = mongoose.model('User',userSchema);
module.exports = User