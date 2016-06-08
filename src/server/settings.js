process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export default {
    adminUsers: ['bbviana'],

    db: {
        development: {
            url: 'mongodb://localhost/alexandria'
        },
        production: {
            url: 'mongodb://localhost/alexandria'
        },
        test: {
            url: 'mongodb://localhost/alexandria-test'
        }
    },

    googleAuth: {
        clientID: '1013117844-3thlraa59raounj84degjbb118vsl9qd.apps.googleusercontent.com',
        clientSecret: 'T4hvfwzBJSxNmvEQLUKLeCtI',
        callbackURL: 'http://localhost:8000/auth/google/callback',
        hostedDomain: 'touchtec.com.br'
    }
}

