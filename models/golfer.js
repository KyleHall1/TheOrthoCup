const mongoose = require('mongoose')

const golferSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    }
})

module.exports = mongoose.model('Golfer', golferSchema)