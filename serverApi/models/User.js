const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

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
  }
});

UserSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique'});
const User = mongoose.model('User', UserSchema);

module.exports = User;