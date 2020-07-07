const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
// const { promisify } = require('util') //Converte a forma antiga de callbacks para a nova forma

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },

  product_description: {
    type: String,
    required: true,
  },

  product_price: {
    type: String,
    required: true,
  },

  product_picture_url: {
    type: String,
  },

  product_picture_key: {
    // Esse campo será usado para deletar a imagem do banco quando um produto for deletado
    type: String,
  },

  product_user: {
    // Esse campo define quando o produto adicionado é uma sugestão de usuário
    type: Boolean,
  },

  market_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supermarket',
  },
})

ProductSchema.plugin(mongoosePaginate)

// ProductSchema.pre('save', function() {
//   if(!this.product_picture_url) {
//     this.product_picture_url = `${process.env.APP_URL}/files/${this.product_picture_key}`
//   }
// })

// // ProductSchema.pre('remove', function() {
// //   return promisify(fs.unlink)(
// //     path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key)
// //   )
// // })

module.exports = mongoose.model('Product', ProductSchema)
