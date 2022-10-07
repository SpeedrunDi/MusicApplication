const path = require("path");
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');

const config = require('../config');
const Album = require('../models/Album');
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
  if (req.query.artist) {
    query.artist = {$eq: req.query.artist};
  }

  try {
    query.isPublished = {$eq: true};

    const token = req.get('Authorization');
    const user = await User.findOne({token});
    if (user && user.role === 'admin') {
      delete query.isPublished;
    }

    const albums = await Album
      .find(query)
      .sort({release: 1})
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

    if (!album) {
      return res.status(404).send({message: 'Album not found'})
    }


    const token = req.get('Authorization');
    const user = await User.findOne({token});

    if (user && user.role === 'admin') {
      return res.send(album);
    }

    if (album.isPublished === false) {
      return res.sendStatus(301);
    }

    res.send(album)
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
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

  if (req.file) albumData.image = 'uploads/' + req.file.filename;

  const album = new Album(albumData);

  try {
    await album.save();

    res.send(album);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const albumId = req.params.id;

    if (!albumId) {
      return res.status(400).send({error: 'ID not valid'});
    }


    const publishedAlbum = await Album.findOneAndUpdate({
      _id: albumId
    }, {
      isPublished: true
    }, {
      returnDocument: 'after',
    });

    if (!publishedAlbum) {
      return res.status(404).send({message: "Album not found!"});
    }

    res.send(publishedAlbum);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const albumId = req.params.id;

    if (!albumId) {
      return res.status(400).send({error: 'ID not valid'});
    }

    const deletedAlbum = await Album.findOneAndDelete({
      _id: albumId
    });

    if (!deletedAlbum) {
      return res.status(404).send({message: "Album not found!"});
    }

    res.send(deletedAlbum);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;