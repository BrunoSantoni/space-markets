const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const SupermarketController = require('./controllers/SupermarketController')
const UserController = require('./controllers/UserController')

routes.get('/', (req, res) => {
  return res.send('Alô')
})

//WEB
routes.post('/cadastro', SupermarketController.create)

//MOBILE
routes.post('/usercadastro', UserController.create)

module.exports = routes