const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const cloudinaryStorage = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinaryConfig')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(
        null,
        path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'products'),
      )
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(4, (err, hash) => {
        if (err) {
          cb(err)
        }
        // Define o novo nome da imagem, adicionando os caracteres
        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key)
      })
    },
  }),

  cloudinary: cloudinaryStorage({
    cloudinary,
    folder: 'products',
    allowedFormats: ['jpg', 'png'],
    filename: (req, file, cb) => {
      crypto.randomBytes(4, (err, hash) => {
        if (err) {
          cb(err)
        }
        const fileName = `${hash.toString('hex')}-${file.originalname}`

        cb(null, fileName)
      })
    },
  }),
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'products'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Tipo de arquivo inválido!'))
    }
  },
}
