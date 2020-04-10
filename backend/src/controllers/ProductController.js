const Product = require('../models/Product')

module.exports = {
  async index(req, res) {
    const auth = req.headers.auth

    const products = await Product.find({market_id: auth})

    return res.json(products)
  },

  //FUNÇÃO PARA INSERIR PRODUTOS, PRECISA PASSAR O ID REAL COMO PARÂMETRO PARA O HEADERS
  async create(req, res) {
    const { product_name, product_description, product_price } = req.body
    const { key } = req.file
    
    const auth = req.headers.auth

    const prod = await Product.create({
      product_name,
      product_description,
      product_price,
      market_id: auth,
      product_picture_key: key,      
      product_picture_url: ''
    })

    //const prod = await Product.find().populate('market_id', 'market_name').select('product_name')
    return res.json(prod)
  },

  async update(req, res) {
    const { id } = req.params
    const marketId = req.headers.auth
    const { product_name, product_description, product_price } = req.body

    const product = await Product.findById(id)

    if(marketId != product.market_id) {
      console.log(marketId, product.market_id)
      return res.status(401).json({ error: 'Operação não permitida' })
    }

    await Product.update({_id: id}, {
      product_name: product_name,
      product_description: product_description,
      product_price: product_price
    }, function(err, affected, resp) {
      console.log(resp)
    })

    return res.status(204).send()
  },

  async delete(req, res) {
    const { id } = req.params
    const marketId = req.headers.auth

    const product = await Product.findById(id)

    if(marketId != product.market_id) {
      return res.status(401).json({ error: 'Operação não permitida' })
      /* Troca o Status do código HTTP. Código de sucesso é 200, e 401 é não autorizado,
      Ou seja, o mercado não está autorizado a deletar esse produto */
    }

    await product.remove()

    return res.status(204).send()
    /* Status 204 indica uma resposta que teve sucesso, mas não tem nenhum conteúdo para retornar. */
  }
}