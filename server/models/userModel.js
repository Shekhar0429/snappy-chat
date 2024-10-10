const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

//user schema
const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true,
    min:3,
    max:20,
    unique:true
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
    select: false,
  },
  isAvatarImageSet: {
    type:Boolean,
    default:false
  },
  avatarImage: {
    type:String,
    default:""
  },
  // firstName: {
  //   type: String,
  //   required: false,
  // },
  // lastName: {
  //   type: String,
  //   required: false,
  // },
  // color: {
  //   type: Number,
  //   required: false,
  // },
  // profileSetup: {
  //   type: Boolean,
  //   default: false,
  // },
});

userSchema.pre('save', async function (next) {
  //hash the password with cost of 12/salt
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
