const mongoose = require('mongoose');

const URI = "mongodb+srv://kjduy:kjduy@cluster0.hublu.mongodb.net/adoppet?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Connect to DataBase');
};

module.exports = connectDB;