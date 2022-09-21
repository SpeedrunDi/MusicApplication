const express = require('express');
const User = require("../models/User");
const TrackHistory = require("../models/TrackHistory");

const router = express.Router();

router.post('/', async (req, res) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).send({error: 'No token present'});
  }

  try {
    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Unauthorized'});
    }

    if (!req.body.track) {
      return res.status(400).send({error: 'Data not valid'});
    }

    const datetime = new Date().toISOString();

    const track_historyData = {
      user: user._id,
      track: req.body.track,
      datetime
    };

    const track_history = new TrackHistory(track_historyData);

    await track_history.save();

    res.send(track_history);
  } catch (e) {
    res.status(404).send({message: 'Track not found!'});
  }
});

module.exports = router;