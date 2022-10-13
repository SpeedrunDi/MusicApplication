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

    const [admin, user] = await User.create({
        username: 'admin@gmail.com',
        avatar: 'https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/user.png',
        displayName: 'Admin',
        password: 'admin',
        role: 'admin',
        token: nanoid(),
        avatarIsLink: true,
    }, {
        username: 'user@gmail.com',
        password: 'user',
        displayName: 'User',
        role: 'user',
        token: nanoid(),
    });

    const [artist1, artist2, artist3] = await Artist.create({
        name: "Rihanna",
        image: "fixtures/rihanna.jpg"
    }, {
        name: "Eminem",
        image: "fixtures/eminem.jpg"
    }, {
        name: "Billie eilish",
        image: "fixtures/billie-eilish.jpg"
    });

    const [album1, album2, album3, album4] = await Album.create({
        title: "Unapologetic",
        artist: artist1._id,
        release: 2012
    }, {
        title: "Curtain Call: The Hits",
        artist: artist2._id,
        release: 2005
    }, {
        title: "Happier Than Ever",
        artist: artist3._id,
        release: 2021
    }, {
        title: "When We All Fall Asleep, Where Do We Go?",
        artist: artist3._id,
        release: 2019
    });

    await Track.create({
        title: "Diamonds",
        album: album1._id,
        duration: "2:45"
    }, {
        title: "phresh out the runway",
        album: album1._id,
        duration: "3:42"
    }, {
        title: "numb",
        album: album1._id,
        duration: "2:41"
    }, {
        title: "pour it up",
        album: album1._id,
        duration: "2:41"
    }, {
        title: "loveeeeeee song",
        album: album1._id,
        duration: "4:16"
    }, {
        title: "right now",
        album: album1._id,
        duration: "3:01"
    }, {
        title: "Lose yourself",
        album: album2._id,
        duration: "5:20"
    }, {
        title: "Fack",
        album: album2._id,
        duration: "3:26"
    }, {
        title: "My name is",
        album: album2._id,
        duration: "4:29"
    }, {
        title: "Stan",
        album: album2._id,
        duration: "6:44"
    }, {
        title: "Shake that",
        album: album2._id,
        duration: "4:34"
    }, {
        title: "The way i am",
        album: album2._id,
        duration: "4:50"
    }, {
        title: "when the party’s over",
        album: album4._id,
        duration: "3:16"
    }, {
        title: "xanny",
        album: album4._id,
        duration: "4:04"
    }, {
        title: "all the good girls go to hell",
        album: album4._id,
        duration: "2:49"
    }, {
        title: "bad guy",
        album: album4._id,
        duration: "3:14"
    }, {
        title: "you should see me in a crown",
        album: album4._id,
        duration: "3:01"
    }, {
        title: "wish you were gay",
        album: album4._id,
        duration: "3:42"
    }, {
        title: "my strange addiction",
        album: album4._id,
        duration: "3:00"
    }, {
        title: "my future",
        album: album3._id,
        duration: "3:30"
    }, {
        title: "goldwing",
        album: album3._id,
        duration: "2:32"
    }, {
        title: "getting older",
        album: album3._id,
        duration: "4:04"
    }, {
        title: "billie bossa nova",
        album: album3._id,
        duration: "3:17"
    }, {
        title: "Oxytocin",
        album: album3._id,
        duration: "3:30"
    }, {
        title: "i didn’t change my number",
        album: album3._id,
        duration: "2:38"
    });

    await mongoose.connection.close();
};

run().catch(console.error);