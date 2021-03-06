import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import flash from 'connect-flash'
import morgan from 'morgan'
import passport from 'passport'
import path from 'path'
import session from 'express-session'
import securityPassport from './security/passport'
import securityRoutes from './security/routes'
import db from './db'
import routes from './routes'

const app = express()
const port = process.env.PORT || 8000

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../public'))
app.use(morgan('dev')) // log every request to the console
app.set('view engine', 'ejs') // set up ejs for templating

// security
app.use(session({ secret: 'teste10' })) // FIXME: pra que serve?
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session
securityRoutes(app, passport)
securityPassport(passport)

// Routes
app.use('/api/snippets', routes.snippets)
app.use('/api/star', routes.stars)
app.use('/api/users', routes.users)

// Deve estar aqui no fim
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname + '/../', 'public', 'index.html'))
})

// Error handling
app.use(function(error, req, res, next) {
    console.error(error)
    res.status(500).send(error)
})

app.listen(port)
console.log(`Server runing at http://localhost:${port}`)
