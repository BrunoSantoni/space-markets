const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const multerConfigProducts = require('./config/multerProduct')
const multerConfigUser = require('./config/multerUser')


const ProductController = require('./controllers/ProductController')
const SupermarketController = require('./controllers/SupermarketController')
const SupermarketSessionController = require('./controllers/SupermarketSessionController')


const UserController = require('./controllers/UserController')
const UserSessionController = require('./controllers/UserSessionController')

//WEB
routes.post('/login', SupermarketSessionController.create)

routes.post('/cadastro', multer(multerConfig).single('market_picture'), SupermarketController.create)

routes.put('/edit/:id', SupermarketController.update)
routes.get('/edit', SupermarketController.currentSupermarket)

routes.get('/perfil', SupermarketController.profileImage) //Rota para exibir a imagem de perfil
routes.put('/perfil/:id', multer(multerConfig).single('market_new_picture'), SupermarketController.updateImg) //Rota para editar a imagem de perfil do mercado

routes.get('/produtos', ProductController.index)
routes.post('/produtos', multer(multerConfigProducts).single('product_picture'), ProductController.create)
routes.put('/produtos/:id', ProductController.update)
routes.delete('/produtos/:id', ProductController.delete)

//MOBILE
routes.get('/usercadastro', UserController.index)
routes.post('/usercadastro', multer(multerConfigUser).single('user_picture'), UserController.create)

routes.post('/userlogin', UserSessionController.create)

routes.get('/mercados', SupermarketController.index)

module.exports = routes