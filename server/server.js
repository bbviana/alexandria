import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import {index, snippets} from './routes'

mongoose.connect('mongodb://localhost/alexandria')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/../client/public'))

// Routes
app.use('/api', index)
app.use('/api/snippets', snippets)

// Deve estar aqui no fim
app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname + '/../client/', 'public', 'index.html'))
})

app.listen(8000)
console.log("Server runing at http://localhost:8000")
