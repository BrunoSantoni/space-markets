const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const multerConfigProducts = require('./config/multerProduct')

const ProductController = require('./controllers/ProductController')
const ProfileController = require('./controllers/ProfileController')
const SupermarketController = require('./controllers/SupermarketController')
const SupermarketSessionController = require('./controllers/SupermarketSessionController')


const UserController = require('./controllers/UserController')
const UserSessionController = require('./controllers/UserSessionController')

//WEB
routes.post('/login', SupermarketSessionController.create)

routes.post('/cadastro', multer(multerConfig).single('market_picture'), SupermarketController.create)

routes.get('/perfil', ProfileController.profileImage)
routes.get('/perfil/produtos', ProfileController.index)

routes.post('/produtos/novo', multer(multerConfigProducts).single('product_picture'),ProductController.create)

//MOBILE
routes.post('/usercadastro', UserController.create)
routes.post('/userlogin', UserSessionController.create)

module.exports = routes