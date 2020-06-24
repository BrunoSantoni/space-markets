const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const SupermarketSchema = new mongoose.Schema({
  market_name: {
    type: String,
    required: true,
  },
  market_mail: {
    type: String,
    required: true,
  },
  market_password: {
    type: String,
    required: true,
  },
  market_cnpj: {
    type: String,
    required: true,
    minlength: 14,
    maxlength: 20,
  },

  market_cep: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 11,
  },

  market_street: {
    type: String,
    required: true,
  },

  market_number: {
    type: Number,
    required: true,
  },

  market_neighborhood: {
    type: String,
    required: true,
  },

  market_city: {
    type: String,
    required: true,
  },

  market_uf: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2,
  },

  market_latitude: {
    type: Number,
  },

  market_longitude: {
    type: Number,
  },

  market_picture_url: {
    type: String,
  },

  market_picture_key: {
    type: String,
  },
})

SupermarketSchema.pre('save', async function () {
  this.market_password = await bcrypt.hash(this.market_password, 6)
})

SupermarketSchema.pre('updateOne', async function () {
  const data = this.getUpdate()
  if (!data.market_password) return

  data.market_password = await bcrypt.hash(data.market_password, 6)
  this.update({}, data).exec()
})

module.exports = mongoose.model('Supermarket', SupermarketSchema)
