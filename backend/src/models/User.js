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
  }
})

module.exports = mongoose.model('User', UserSchema)