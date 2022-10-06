const path = require("path");
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');

const config = require('../config');
const Artist = require('../models/Artist');

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
  try {
    const artists = await Artist.find();

    res.send(artists);
  } catch {
    res.sendStatus(500);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const {name, information} = req.body;

  if (!name) {
    return res.status(400).send({error: 'Data not valid'});
  }

  const artistData = {
    name,
    image: null,
    information: null
  };

  if (req.file) artistData.image = 'uploads/' + req.file.filename;
  if (information) artistData.information = information;

  const artist = new Artist(artistData);

  try {
    await artist.save();

    res.send(artist);
  } catch (e) {
    res.status(400).send(e => console.error(e));
  }
});

module.exports = router;