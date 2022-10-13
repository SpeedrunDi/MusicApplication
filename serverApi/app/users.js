const express = require('express');
const axios = require("axios");
const {nanoid} = require("nanoid");
const User = require('../models/User');
const config = require('../config');

const router = express.Router();

router.post('/', async (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).send({error: 'Data not valid'});
  }

  const userData = {username, password};

  try {
    const user = new User(userData);

    user.generateToken();

    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/sessions', async  (req, res) => {
 try {
   const user = await User.findOne({username: req.body.username});

   if (!user) {
     return res.status(401).send({error: 'Username and password if wrong'});
   }

   const isMatch = await user.checkPassword(req.body.password);

   if (!isMatch) {
     return res.status(401).send({error: 'Username and password if wrong'});
   }

   user.generateToken();
   await user.save();

   res.send({message: 'Username and password correct!', user});
 } catch (e) {
   res.status(400).send(e);
 }
});

router.post('/facebookLogin', async (req, res) => {
  const inputToken = req.body.accessToken;
  const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

  const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

  try {
    const response = await axios.get(debugTokenUrl);

    if (response.data.data.error) {
      return res.status(401).send({error: 'Facebook token incorrect!'});
    }

    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({error: 'Wrong User ID'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if (!user) {
      user = new User({
        username: req.body.username,
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name
      });
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({message: 'Login or register successful!', user});
  } catch (e) {
    res.status(401).send({error: 'Facebook token incorrect!'});
  }
});

router.delete('/sessions', async (req, res) => {
  try {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    return res.send({success, user});
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;