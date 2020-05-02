const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'supermega',
  api_key: process.env.CLOUDINARY_ACCESS_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_ACCESS_KEY,
})

module.exports = cloudinary
