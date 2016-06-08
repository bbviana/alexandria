import mongoose, { Schema } from 'mongoose'
import Snippet from '../snippets/Snippet'
import User from '../users/User'

const { ObjectId } = Schema.Types

const schema = new Schema({
    snippet: {type: ObjectId, ref: 'Snippet'},
    user: {type: ObjectId, ref: 'User'}
})

schema.pre('save', function (next) {
    this.count({
            snippet: this.snippet,
            user: this.user
        })
        .exec((err, count) => {
            count > 0 ?
                next(new Error('Este usuário já adicionou o snippet aos favoritos')) :
                next()
        })
})

// async post: recebe 2o arg next
schema.post('save', function (star, next) {
    Snippet.findById(star.snippet,
        (err, snippet) => {
            snippet.stars.push(star)
            snippet.save(next)
        })

    User.findById(star.user,
        (err, user) => {
            user.stars.push(star)
            user.save(next)
        })

})

// async post: recebe 2o arg next
schema.post('remove', function (star, next) {
    Snippet.findById(star.snippet,
        (err, snippet) => {
            console.log('snippet')
            snippet.stars = snippet.stars.filter(it => it != star.id)
            snippet.save(next)
        })
})

schema.post('remove', function (star, next) {
    User.findById(star.user,
        (err, user) => {
            console.log('user')
            user.stars = user.stars.filter(it => it != star.id)
            user.save(next)
        })
})

export default mongoose.model('Star', schema)