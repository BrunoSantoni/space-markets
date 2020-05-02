const multer = require('multer')
const path = require('path')
const cloudinaryStorage = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinaryConfig')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'user'))
    },
  }),

  cloudinary: cloudinaryStorage({
    cloudinary,
    folder: 'users',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  }),
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'user'),
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
