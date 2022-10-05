const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require('nanoid');
const User = require("./models/User");
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, test] = await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid(),
    }, {
        username: 'test',
        password: 'test',
        token: nanoid(),
    });

    const [artist1, artist2] = await Artist.create({
        name: "Rihanna"
    }, {
        name: "Eminem"
    });

    const [album1, album2] = await Album.create({
        title: "my favorite",
        artist: artist1._id,
        release: 2012
    }, {
        title: "my favorite 2",
        artist: artist2._id,
        release: 2000
    });

    await Track.create({
        title: "Diamonds",
        album: album1._id,
        duration: "2:45"
    }, {
        title: "Stay",
        album: album1._id,
        duration: "2:45"
    }, {
        title: "Lose yourself",
        album: album2._id,
        duration: "2:45"
    });

    await mongoose.connection.close();
};

run().catch(console.error);