const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true
  },
  
  user_mail: {
    type: String,
    required: true
  },

  user_cpf: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 15
  },

  user_password: {
    type: String,
    required: true
  },

  user_profile_picture_url: {
    type: String
  }
})

UserSchema.pre('save', function() {
  if(!this.user_profile_picture_url) {
    this.user_profile_picture_url = `${process.env.APP_MOBILE_URL}/files/${this._id}.png`
  }
})

module.exports = mongoose.model('User', UserSchema)