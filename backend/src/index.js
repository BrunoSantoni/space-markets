const { errors } = require('celebrate')
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'products')))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'user')))

app.use(require('./routes'))
app.use(errors())
app.listen(3333)