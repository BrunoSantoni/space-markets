const mongoose = require('mongoose')

const SupermarketSchema = new mongoose.Schema({
  market_id: {
    type: String
  },

  market_name: {
    type: String,
    required: true
  },
  market_mail: {
    type: String,
    required: true
  },
  market_password: {
    type: String,
    required: true
  },
  market_cnpj: {
    type: String,
    required: true,
    minlength: 14,
    maxlength: 20
  },

  market_street: {
    type: String,
    required: true
  },

  market_number: {
    type: Number,
    required: true
  },

  market_neighborhood: {
    type: String,
    required: true
  },

  market_city: {
    type: String,
    required: true
  },

  market_uf: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2
  },

  market_latitude: {
    type: String
  },

  market_longitude: {
    type: String
  },
})

module.exports = mongoose.model('Supermarket', SupermarketSchema)