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

routes.get('/perfil', ProfileController.profileImage) //Rota para exibir a imagem de perfil

routes.get('/produtos', ProductController.index)
routes.post('/produtos', multer(multerConfigProducts).single('product_picture'),ProductController.create)

routes.post('/produtos/:id', ProductController.update)
routes.delete('/produtos/:id', ProductController.delete)

//MOBILE
routes.post('/usercadastro', UserController.create)
routes.post('/userlogin', UserSessionController.create)

module.exports = routes