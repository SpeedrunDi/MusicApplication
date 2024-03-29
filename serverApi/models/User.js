const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const {nanoid} = require("nanoid");

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  displayName: {
    type: String,
    required: true,
  },
  avatar: String,
  avatarIsLink: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = nanoid();
};

UserSchema.plugin(uniqueValidator, {message: 'Error, such username already exists'});
const User = mongoose.model('User', UserSchema);

module.exports = User;