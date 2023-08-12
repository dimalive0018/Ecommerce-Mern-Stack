const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connection.on('connected', () => {
        console.log('Mongoose è connesso'.green);
    });

    mongoose.connection.on('disconnected', () => {
        return console.log('Mongoose è disconnesso'.red);
    });

    mongoose.connection.on('error', err => {
        return console.log(`Error in Mongoose, ${err}`.red);
    });

    return mongoose.connect(process.env.MONGO_DB_URL,
        {
            user: process.env.MONGO_USERNAME,
            pass: process.env.MONGO_PASSWORD,
            dbName: process.env.DB_NAME
        }
    );
};

module.exports = connectDB;