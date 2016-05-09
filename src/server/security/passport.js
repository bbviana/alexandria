import { Strategy as LocalStrategy } from 'passport-local'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

import { adminUsers, googleAuth } from '../settings'

import User from '../models/User'

export default function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user._id)
    })

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user)
        })
    })

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, login, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function () {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({login: login}, function (err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        return done(err)
                    }

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That login is already taken.'))
                    }

                    // if there is no user with that email, create the user
                    var newUser = new User()

                    newUser.login = login
                    newUser.password = newUser.generateHash(password)

                    newUser.save(function (err) {
                        if (err) throw err
                        return done(null, newUser)
                    })

                })

            })

        }))

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, login, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({login: login}, function (err, user) {
                if (err) {
                    return done(err)
                }

                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')) // req.flash is the way to set flashdata using connect-flash
                }

                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')) // create the loginMessage and save it to session as flashdata
                }

                return done(null, user)
            })

        }))


    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================

    passport.use(new GoogleStrategy({
            clientID: googleAuth.clientID,
            clientSecret: googleAuth.clientSecret,
            callbackURL: googleAuth.callbackURL
        },

        function (token, refreshToken, profile, done) {

            if (profile._json.domain !== "touchtec.com.br") {
                done(new Error("Só é permitido o login com uma conta touchtec.com.br"))
            }

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function () {

                User.findOne({'google.id': profile.id}, function (err, user) {
                    if (err) return done(err)

                    if (user) return done(null, user)

                    var newUser = new User()

                    newUser.google.id = profile.id
                    newUser.google.token = token
                    newUser.name = profile.displayName
                    newUser.email = profile.emails[0].value
                    newUser.login = newUser.email.split('@')[0]
                    newUser.avatarURL = profile.photos[0].value
                    newUser.admin = adminUsers.indexOf(newUser.login) != -1

                    newUser.save(function (err) {
                        if (err) throw err
                        return done(null, newUser)
                    })
                })
            })
        }))
}