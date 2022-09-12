const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
  const query = {};
  if (req.query.album) {
    query.album = {$eq: req.query.album};
  }

  try {
    const tracks = await Track
      .find(query)
      .populate('album', 'title');

    res.send(tracks);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = router;