const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  release: {
    type: Number,
    required: true
  },
  image: String,
  isPublished: {
    type: Boolean,
    default: false
  }
});

AlbumSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
AlbumSchema.plugin(uniqueValidator, {message: 'Error, this {PATH} already exists!'});
const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;