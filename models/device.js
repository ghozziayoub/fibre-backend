const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true
    }
})

const Device = mongoose.model("device", DeviceSchema);

module.exports = Device