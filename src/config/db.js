const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        const mongo_host = config.MONGODB_URL;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(mongo_host);
        console.info('MongoDB Connected...');
    } catch (error) {
        console.log('error: ', error);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
