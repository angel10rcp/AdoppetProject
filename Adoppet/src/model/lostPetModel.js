const mongoose = require('mongoose');

const lostpet = new mongoose.Schema({
    idPetLostPet: {
        type: String
    },
    lostFlagLostPet: {
        type: String
    },
    lostPetPlace: {
        type: String
    }
}, {
    collection: 'lostpet',
    versionKey: false
});

module.exports = LostPet = mongoose.model('lostpet', lostpet);