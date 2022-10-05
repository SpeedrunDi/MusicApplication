const express = require('express');
const TrackHistory = require("../models/TrackHistory");
const auth = require("../middleware/auth");
const Track = require("../models/Track");

const router = express.Router();

router.get('/', auth,async (req, res) => {
  try {
    const tracks_history = await TrackHistory
      .find()
      .sort({datetime: -1})
      .populate('track', 'title');

    res.send(tracks_history);
  } catch (e) {
    res.status(500).send({error: e.errors});
  }
});

router.post('/', auth, async (req, res) => {
  try {
    if (!req.body.track) {
      return res.status(400).send({error: 'Data not valid'});
    }

    const track = await Track.findById(req.body.track);
    if (!track) {
      return res.status(404).send({message: 'Track not found!'});
    }

    const datetime = new Date().toISOString();

    const track_historyData = {
      user: req.user._id,
      track: req.body.track,
      datetime
    };

    const track_history = new TrackHistory(track_historyData);

    await track_history.save();

    res.send(track_history);
  } catch (e) {
    res.status(500).send({error: e.errors});
  }
});

module.exports = router;