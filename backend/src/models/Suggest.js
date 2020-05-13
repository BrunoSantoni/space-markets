const mongoose = require('mongoose')

const SuggestSchema = new mongoose.Schema({
  suggest_name: {
    type: String,
    required: true,
  },

  suggest_description: {
    type: String,
    required: true,
  },

  suggest_price: {
    type: String,
    required: true,
  },

  suggest_picture_url: {
    type: String,
  },

  suggest_picture_key: {
    // Esse campo será usado para deletar a imagem do banco quando um produto for deletado
    type: String,
  },

  suggest_user: {
    // Esse campo define quando o produto adicionado é uma sugestão de usuário
    type: Boolean,
  },

  market_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supermarket',
  },
})

module.exports = mongoose.model('Suggest', SuggestSchema)
