const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

//checking if while registering the password and repeatPassword matches
userSchema.virtual('repeatPassword').set(function (value) {
  if (value !== this.password) {
    throw new Error('Passwords missmatch');
  }
});

// before the save, we hash the password
userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
