const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    }
})

const Token = mongoose.model("token", TokenSchema);

module.exports = Token