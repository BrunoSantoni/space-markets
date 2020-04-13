const multer = require('multer')
const path = require('path')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const cloudinary = require('./cloudinaryConfig')
const cloudinaryStorage = require('multer-storage-cloudinary')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => { 
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'user'))
    },
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
    folder: 'users',
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
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'user'), 
  storage: storageTypes[process.env.STORAGE_TYPE],

  limits: { 
    fileSize: 2 * 1024 * 1024 
  },

  fileFilter: (req, file, cb) => { 
    const allowedMimes = [
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