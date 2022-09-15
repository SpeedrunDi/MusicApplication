const express = require('express');
const Track = require('../models/Track');
const Album = require('../models/Album');

const router = express.Router();

router.get('/', async (req, res) => {
  const query = {};
  try {
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

router.post('/', async (req, res) => {
  const {title, album, duration} = req.body;

  if (!title || !album || !duration) {
    return res.status(400).send({error: 'Data not valid'});
  }

  const trackData = {title, album, duration};

  const track = new Track(trackData);

  try {
    await track.save();

    res.send(track);
  } catch (e) {
    res.status(400).send({error: e.errors});
  }
});

module.exports = router;