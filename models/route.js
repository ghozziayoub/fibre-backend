const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
    idDevice: {
        type: String,
        required: true,
    },
    nom: {
        type: String,
        required: true,
        unique: true
    }
})

const Route = mongoose.model("route", RouteSchema);

module.exports = Route