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

  user_profile_picture: {
    type: Buffer
  },

  user_picture_key: {
    type: String
  },

  user_picture_url: {
    type: String
  }  
})

UserSchema.pre('save', function() {
  if(!this.user_picture_url) {
    this.user_picture_url = `${process.env.APP_URL}/files/${this.user_picture_key}`
  }
})

module.exports = mongoose.model('User', UserSchema)