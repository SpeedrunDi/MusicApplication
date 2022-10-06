const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  information: String
});

ArtistSchema.plugin(uniqueValidator, {message: 'Error, this {PATH} already exists'});
const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;