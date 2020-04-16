const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const multerConfigProducts = require('./config/multerProduct')
const multerConfigUser = require('./config/multerUser')
const { celebrate, Segments, Joi } = require('celebrate')


const ProductController = require('./controllers/ProductController')
const ProfileController = require('./controllers/ProfileController')
const SupermarketController = require('./controllers/SupermarketController')
const SupermarketSessionController = require('./controllers/SupermarketSessionController')


const Validators = require('./validators/Validators')


const UserController = require('./controllers/UserController')
const UserSessionController = require('./controllers/UserSessionController')

//WEB
routes.post('/login', SupermarketSessionController.create)

routes.post('/cadastro', multer(multerConfig).single('market_picture'), celebrate({
  [Segments.BODY]: Joi.object().keys({
    market_name: Joi.string().required(),
    market_mail: Joi.string().required().email(),
    market_password: Joi.string().min(6).max(20),
    market_cnpj: Joi.string().required().min(14).max(20),
    market_cep: Joi.string().required().length(9),
    market_street: Joi.string().required(),
    market_number: Joi.string().required().max(4),
    market_neighborhood: Joi.string().required(),
    market_city: Joi.string().required(),
    market_uf: Joi.string().required().length(2),
    market_latitude: Joi.number().required(),
    market_longitude: Joi.number().required()
  })
}), SupermarketController.create)

routes.put('/edit/:id', ProfileController.update)
routes.get('/edit', ProfileController.index)

routes.get('/perfil', ProfileController.profileImage) //Rota para exibir a imagem de perfil

routes.get('/produtos', ProductController.index)
routes.post('/produtos', multer(multerConfigProducts).single('product_picture'),ProductController.create)
routes.put('/produtos/:id', ProductController.update)
routes.delete('/produtos/:id', ProductController.delete)

//MOBILE
routes.get('/usercadastro', UserController.index)
routes.post('/usercadastro', multer(multerConfigUser).single('user_picture'), UserController.create)

routes.post('/userlogin', UserSessionController.create)

routes.get('/mercados', SupermarketController.index)

module.exports = routes