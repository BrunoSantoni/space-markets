require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use(require('./routes'))

app.listen(3333)
