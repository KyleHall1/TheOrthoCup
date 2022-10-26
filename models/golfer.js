const mongoose = require('mongoose')

const golferSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber:{
      type: Number,
      required: true
    },
    shirtSize:{
        type: String
    },
    hatSize:{
        type: String
    }
})

module.exports = mongoose.model('Golfer', golferSchema)