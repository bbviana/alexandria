import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import {index, pessoas} from './routes'

mongoose.connect('mongodb://localhost/alexandria')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

// Routes
app.use('/api', index)
app.use('/api/pessoas', pessoas)

app.listen(8000)
console.log("Server runing at http://localhost:8000")
