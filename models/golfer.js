const mongoose = require('mongoose')
const path = require('path')
const profilePicBasePath = "uploads/profilePics/"

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
    },
    profilePicName:{
      data: Buffer,
      contentType: String

    }
})


golferSchema.virtual('profilePicPath').get(function(){
  if (this.profilePicName != null){
    return path.join('/', profilePicBasePath, this.profilePicName)
  } else {
    return path.join('/', profilePicBasePath,'defualtProfilePic.jpg')
  }
})

module.exports = mongoose.model('Golfer', golferSchema)
module.exports.profilePicBasePath = profilePicBasePath