const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true
  },
  datetime: {
    type: String,
    required: true
  }
});

TrackHistorySchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});
const TrackHistory = mongoose.model('Track_history', TrackHistorySchema);

module.exports = TrackHistory;