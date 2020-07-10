const mongoose = require('mongoose');

const CoordonneeSchema = new mongoose.Schema({
    idRoute: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    }
})

const Coordonnee = mongoose.model("coordonnee", CoordonneeSchema);

module.exports = Coordonnee