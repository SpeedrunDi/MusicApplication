const path = require("path");
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');

const config = require('../config');
const Artist = require('../models/Artist');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const User = require("../models/User");

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
  try {
    query.isPublished = {$eq: true};

    const token = req.get('Authorization');
    const user = await User.findOne({token});
    if (user && user.role === 'admin') {
      delete query.isPublished;
    }

    const artists = await Artist.find(query);

    res.send(artists);
  } catch {
    res.sendStatus(500);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
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
    res.status(400).send(e);
  }
});

router.patch('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const artistId = req.params.id;

    if (!artistId) {
      return res.status(400).send({error: 'ID not valid'});
    }


    const publishedArtist = await Artist.findOneAndUpdate({
      _id: artistId
    }, {
      isPublished: true
    }, {
      returnDocument: 'after',
    });

    if (!publishedArtist) {
      return res.status(404).send({message: "Artist not found!"});
    }

    res.send(publishedArtist);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const artistId = req.params.id;

    if (!artistId) {
      return res.status(400).send({error: 'ID not valid'});
    }

    const deletedArtist = await Artist.findOneAndDelete({
      _id: artistId
    });

    if (!deletedArtist) {
      return res.status(404).send({message: "Artist not found!"});
    }

    res.send(deletedArtist);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;