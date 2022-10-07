const express = require('express');
const Track = require('../models/Track');
const Album = require('../models/Album');
const auth = require("../middleware/auth");
const User = require("../models/User");
const permit = require("../middleware/permit");

const router = express.Router();

router.get('/', async (req, res) => {
  const query = {};

  try {
    query.isPublished = {$eq: true};

    const token = req.get('Authorization');
    const user = await User.findOne({token});
    if (user && user.role === 'admin') {
      delete query.isPublished;
    }

    if (req.query.artist) {
      query.artist = {$eq: req.query.artist};

      let albumsObj;
      albumsObj = await Album.find(query, {_id: 1});
      let albumsId;
      if (albumsObj) {
        albumsId = albumsObj.map(album => album._id);
      }

      query.album = {$in: albumsId};
      const tracks = await Track
        .find(query)
        .populate('album', 'title');

      if (!tracks) {
        return res.status(404).send({message: 'Tracks not found'});
      }

      res.send(tracks);
    } else {
      if (req.query.album) {
        query.album = {$eq: req.query.album};
      }

      const tracks = await Track
        .find(query)
        .sort({number: 1})
        .populate('album', 'title');

      if (!tracks) {
        return res.status(404).send({message: 'Tracks not found'});
      }

      res.send(tracks);
    }
  } catch {
    res.sendStatus(500);
  }
});

router.post('/', auth, async (req, res) => {
  const {title, album, duration} = req.body;

  if (!title || !album || !duration) {
    return res.status(400).send({error: 'Data not valid'});
  }

  try {
    const trackData = {
      title,
      album,
      duration
    };

    const track = new Track(trackData);
    await track.save();

    res.send(track);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const trackId = req.params.id;

    if (!trackId) {
      return res.status(400).send({error: 'ID not valid'});
    }


    const publishedTrack = await Track.findOneAndUpdate({
      _id: trackId
    }, {
      isPublished: true
    }, {
      returnDocument: 'after',
    });

    if (!publishedTrack) {
      return res.status(404).send({message: "Track not found!"});
    }

    res.send(publishedTrack);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const trackId = req.params.id;

    if (!trackId) {
      return res.status(400).send({error: 'ID not valid'});
    }

    const deletedTrack = await Track.findOneAndDelete({
      _id: trackId
    });

    if (!deletedTrack) {
      return res.status(404).send({message: "Track not found!"});
    }

    res.send(deletedTrack);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;