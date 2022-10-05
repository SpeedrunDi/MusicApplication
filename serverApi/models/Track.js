const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const uniqueValidator = require("mongoose-unique-validator");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  number: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  duration: {
    type: String,
    required: true
  }
});

TrackSchema.plugin(AutoIncrement, {inc_field: 'number'});
TrackSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
TrackSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique'});
const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;