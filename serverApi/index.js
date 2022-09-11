const express = require('express');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const cors = require('cors');
const config = require('./config');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });

  exitHook(() => {
    mongoose.disconnect();
    console.log('MongoDb disconnect');
  });
};

run().catch(e => console.error(e));