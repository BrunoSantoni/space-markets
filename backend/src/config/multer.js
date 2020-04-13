const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const cloudinary = require('./cloudinaryConfig')
const cloudinaryStorage = require('multer-storage-cloudinary')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => { 
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(4, (err, hash) => {
        if(err){
          cb(err)
        }
        //Define o novo nome da imagem, adicionando os caracteres
        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key)
      })
    }
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'supermega',
    contentType: multerS3.AUTO_CONTENT_TYPE, //NÃO FAZ O DOWNLOAD DO ARQUIVO, SÓ EXIBE EM TELA.
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(4, (err, hash) => {
        if(err){
          cb(err)
        }
        //Define o novo nome da imagem, adicionando os caracteres
        const fileName = `${hash.toString('hex')}-${file.originalname}`

        cb(null, fileName)
      })
    }
  }),

  cloudinary: cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'supermarkets',
    allowedFormats: ['jpg', 'png'],
    filename: (req, file, cb) => {
      crypto.randomBytes(4, (err, hash) => {
        if(err){
          cb(err)
        }
        //Define o novo nome da imagem, adicionando os caracteres
        const fileName = `${hash.toString('hex')}-${file.originalname}`

        cb(null, fileName)
      })
    }
  })
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'), //Para onde irão os uploads
  storage: storageTypes[process.env.STORAGE_TYPE],

  //Define limitações de: tamanho, tipo de arquivo, arquivos simultâneos
  limits: { 
    fileSize: 2 * 1024 * 1024 //O tamanho é em bytes, portanto precisa multiplicar para ficar em MB.
  },

  //Filtra os tipos de arquivos aceitos, usando uma função assíncrona mais antiga, que recebe callback
  //como parâmetro, ou seja, quando a requisição terminar, executará outra função
  fileFilter: (req, file, cb) => { //
    const allowedMimes = [ //Formatos aceitos
      'image/jpeg',
      'image/pjpeg',
      'image/png',
    ]

    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Tipo de arquivo inválido!'))
    }
  }
}