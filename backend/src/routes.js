//Arquivo de configuração de rotas

const express = require('express')

const ProductsController = require('./controllers/ProductsController')
const SessionController = require('./controllers/SessionController')
const SupermarketController = require('./controllers/SupermarketController')
const UserController = require('./controllers/UserController')
const UserSessionController = require('./controllers/UserSessionController')

const routes = express.Router()

//WEB
routes.post('/login', SessionController.create)

routes.get('/cadastro', SupermarketController.index)
routes.post('/cadastro', SupermarketController.create)

routes.get('/produtos', ProductsController.index)
routes.post('/produtos', ProductsController.create)
routes.delete('/produtos/:id', ProductsController.delete)

//MOBILE
routes.get('/user-cadastro', UserController.index)
routes.post('/user-cadastro', UserController.create)

routes.post('/user-login', UserSessionController.create)

module.exports = routes