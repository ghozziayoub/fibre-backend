const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
    idRoute: {
        type: String,
        required: true,
    },
    event: {
        type: String,
        required: true,
    },
    loss: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    }
})

const Detail = mongoose.model("detail", DetailSchema);

module.exports = Detail