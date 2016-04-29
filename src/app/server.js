//region Imports
import settingsAuth from './settings/auth'
import settingsDB from './settings/database'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import flash from 'connect-flash'
import mongoose from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'
import path from 'path'
import session from 'express-session'

import securityPassport from './security/passport'
import securityRoutes from './security/routes'

import indexRoute from './index-route'
import snippets from '../snippet/snippets-routes'
//endregion

mongoose.connect(settingsDB.url)

const app = express()
const port = process.env.PORT || 8000;

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../../public'))
app.use(morgan('dev')) // log every request to the console
app.set('view engine', 'ejs') // set up ejs for templating

// security
app.use(session({ secret: 'teste10' })) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session
securityRoutes(app, passport)
securityPassport(passport)

// Routes
app.use('/api', indexRoute)
app.use('/api/snippets', snippets)

// Deve estar aqui no fim
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname + '/../../', 'public', 'index.html'))
})

app.listen(port)
console.log(`Server runing at http://localhost:${port}`)
