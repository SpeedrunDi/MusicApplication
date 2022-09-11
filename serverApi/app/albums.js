const path = require("path");
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');

const config = require('../config');
const Album = require('../models/Album');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
  const query = {};
  if (req.query.artist) {
    query.artist = {$eq: req.query.artist};
  }

  try {
    const albums = await Album
      .find(query)
      .populate('artist', 'name');

    res.send(albums);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const album = await Album
      .findById(req.params.id)
      .populate('artist', 'name image information');

    res.send(album);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const {title, artist, release} = req.body;

  if (!title || !artist || !release) {
    return res.status(400).send({error: 'Data not valid'});
  }

  const albumData = {
    title,
    artist,
    release,
    image: null
  };

  if (req.file) albumData.image = req.file.filename;

  const album = new Album(albumData);

  try {
    await album.save();

    res.send(album);
  } catch (e) {
    res.status(400).send({error: e.errors});
  }
});

module.exports = router;