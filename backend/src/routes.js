const express = require('express')

const SupermarketController = require('./controllers/SupermarketController')
const ProductsController = require('./controllers/ProductsController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/login', SessionController.create)

routes.get('/cadastro', SupermarketController.index)
routes.post('/cadastro', SupermarketController.create)

routes.get('/produtos', ProductsController.index)
routes.post('/produtos', ProductsController.create)
routes.delete('/produtos/:id', ProductsController.delete)

module.exports = routes