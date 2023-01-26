const mongoose = require('mongoose');

const bulletin = new mongoose.Schema({
    bulletinName: {
        type: String
    },
    idPersonBulletin: {
        type: String
    },
    idPetBulletin: {
        type: String
    },
    bulletinDescription:{
        type: String
    },
    bulletinType:{
        type: String
    }
}, {
    collection: 'bulletin',
    versionKey: false
});

module.exports = LostPet = mongoose.model('bulletin', bulletin);