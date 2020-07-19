const mongoose = require('mongoose')
const { genSaltSync, hashSync, compareSync } = require('bcryptjs')

const setUserSchema = new mongoose.Schema({

  name: {
    type: String,
    default: 'John Doe'
  },
  username: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  role: {
    type: String,
    trim: true,
    default: 'user'
  },
  activation_account: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: null
  },
  updated_at: {
    type: Date,
    default: null
  }
})

// register hash password method
setUserSchema.static("hash", (password) => {
  const salt = genSaltSync(10);
  const hashPassword = hashSync(password, salt);
  return hashPassword;
})

// register verify password method
setUserSchema.static('verify', (password, hashPassword) => {
  const verifyPassword = compareSync(password, hashPassword);
  return verifyPassword;
})

const UserSchema = mongoose.model('fullstack', setUserSchema)
module.exports = UserSchema