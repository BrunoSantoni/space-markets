const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const multerConfigProducts = require('./config/multerProduct')
const multerConfigUser = require('./config/multerUser')

/* Rotas Web */
const ImageController = require('./controllers/ImageController')
const ProductController = require('./controllers/ProductController')
const SupermarketController = require('./controllers/SupermarketController')
const SupermarketSessionController = require('./controllers/SupermarketSessionController')

/* Rotas Mobile */
const UserController = require('./controllers/UserController')
const UserSessionController = require('./controllers/UserSessionController')
const SuggestController = require('./controllers/SuggestController')
const SearchProductController = require('./controllers/SearchProductController')

// WEB
routes.post('/login', SupermarketSessionController.create)

routes.post(
  '/cadastro',
  multer(multerConfig).single('market_picture'),
  SupermarketController.create,
)

routes.get('/edit', SupermarketController.show)
routes.put('/edit/:id', SupermarketController.update)

routes.get('/perfil', ImageController.show) // Rota para exibir a imagem de perfil
routes.put(
  '/perfil/:id',
  multer(multerConfig).single('market_new_picture'),
  ImageController.update,
) // Rota para editar a imagem de perfil do mercado

routes.get('/produtos', ProductController.index)
routes.post(
  '/produtos',
  multer(multerConfigProducts).single('product_picture'),
  ProductController.create,
)
routes.put('/produtos/:id', ProductController.update)
routes.delete('/produtos/:id', ProductController.delete)

// MOBILE
routes.get('/usercadastro', UserController.show)
routes.post(
  '/usercadastro',
  multer(multerConfigUser).single('user_picture'),
  UserController.create,
)

routes.post('/userlogin', UserSessionController.create)

routes.get('/mercados', SupermarketController.index)

routes.get('/buscaproduto', ProductController.show)

routes.get('/promocoes', SearchProductController.show)

routes.post(
  '/sugestao',
  multer(multerConfigProducts).single('suggest_picture'),
  SuggestController.store,
)

module.exports = routes
