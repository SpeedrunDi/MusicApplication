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

      const tracks = await Track
        .find({$in: albumsId})
        .populate('album', 'title');

      res.send(tracks);
    } else {
      if (req.query.album) {
        query.album = {$eq: req.query.album};
      }

      const tracks = await Track
        .find(query)
        .populate('album', 'title');

      res.send(tracks);
    }
  } catch {
    res.sendStatus(500);
  }
});

module.exports = router;