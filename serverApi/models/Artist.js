const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  information: String,
  isPublished: {
    type: Boolean,
    default: false
  }
});

ArtistSchema.plugin(uniqueValidator, {message: 'Error, this {PATH} already exists'});
const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;