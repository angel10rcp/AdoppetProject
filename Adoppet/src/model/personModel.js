const mongoose = require('mongoose');

const person = new mongoose.Schema({
    personName: {
        type: String
    },
    password: {
        type: String
    },
    personEmail: {
        type: String
    },
    personPhoneNumber: {
        type: String
    }
}, {
    collection: 'person',
    versionKey: false
});

module.exports = LostPet = mongoose.model('person', person);