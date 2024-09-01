const mongoose = require('mongoose');
const dbURL = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error MongoDB connected fail : ',err.message);
        process.exit(1);
    }
};

module.exports = connectDB;