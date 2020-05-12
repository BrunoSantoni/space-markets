/* eslint-disable consistent-return */
const Joi = require('joi')
const Product = require('../models/Product')

const validator = require('../Validators/validators')

const cloudinary = require('../config/cloudinaryConfig')

module.exports = {
  async index(req, res) {
    const { auth } = req.headers

    const products = await Product.find({ market_id: auth })

    return res.json(products)
  },

  async show(req, res) {
    const { search } = req.headers

    await Product.find({ product_name: new RegExp(`.*${search}.*`, 'i') })
      .populate({
        path: 'market_id',
        market_name: 1,
        market_picture_url: 1,
      })
      .exec((err, product) => {
        if (err) return res.json(err)
        return res.json(product)
      })
  },

  // FUNÇÃO PARA INSERIR PRODUTOS, PRECISA PASSAR O ID REAL COMO PARÂMETRO PARA O HEADERS
  async create(req, res) {
    const { product_name, product_description, product_price } = req.body
    const { public_id, url = '' } = req.file
    let flag = false

    const { auth } = req.headers

    const message = Joi.validate(
      req.body,
      validator.productValidatorCreate,
      (err, resp) => {
        if (err) {
          flag = true
          return err.message
        }
      },
    )

    if (!flag) {
      const prod = await Product.create({
        product_name,
        product_description,
        product_price,
        market_id: auth,
        product_picture_url: url,
        product_picture_key: public_id,
      })

      /* const prod =
       await Product.find().populate('market_id', 'market_name').select('product_name') */
      return res.json(prod)
    }
    return res.json({ message })
  },

  async update(req, res) {
    const { id } = req.params
    const marketId = req.headers.auth
    const { product_name, product_description, product_price } = req.body
    let flag = false

    const product = await Product.findById(id)

    const message = Joi.validate(
      req.body,
      validator.productValidatorCreate,
      (err, resp) => {
        if (err) {
          flag = true
          return err.message
        }
      },
    )

    // eslint-disable-next-line eqeqeq
    if (marketId != product.market_id) {
      return res.status(401).json({ error: 'Operação não permitida' })
    }

    if (!flag) {
      await Product.updateOne(
        { _id: id },
        {
          product_name,
          product_description,
          product_price,
        },
        (err, affected, resp) => {
          if (err) return res.json(err)
        },
      )
      return res.status(204).send()
    }

    return res.json({ message })
  },

  async delete(req, res) {
    const { id } = req.params
    const marketId = req.headers.auth

    const product = await Product.findById(id)

    // eslint-disable-next-line eqeqeq
    if (marketId != product.market_id) {
      return res.status(401).json({ error: 'Operação não permitida' })
      /* Troca o Status do código HTTP. Código de sucesso é 200, e 401 é não autorizado,
      Ou seja, o mercado não está autorizado a deletar esse produto */
    }

    await product.remove()

    /* Deletar imagem do banco */
    await cloudinary.v2.uploader.destroy(
      product.product_picture_key,
      (err, result) => {
        if (err) res.json(err)
        res.json(result)
      },
    )

    return res.status(204).send()
    /* Status 204 indica uma resposta que teve sucesso,
       mas não tem nenhum conteúdo para retornar. */
  },
}
