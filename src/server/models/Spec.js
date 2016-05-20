import { expect }  from 'chai'
import mongoose, { Schema } from 'mongoose'
mongoose.connect('mongodb://localhost/alexandria-test')
const ObjectId = mongoose.Types.ObjectId

import Snippet from './Snippet'
import Star from './Star'
import User from './User'


const execute = (promise) => {
    promise
        .then(saved => console.log('success', saved))
        .catch(err => console.log("\x1b[31m", err, "\x1b[0m"))
}

const log = (item) => console.log('success', item)

const snippetID = ObjectId('573f9add369b57455636d029')
const userID = ObjectId('573f9add369b57455636d029')
const starID = ObjectId('573f9add369b57455636d029')

describe('sandbox', () => {
    it('snippet', done => {
        new Snippet({_id: snippetID}).save(done)
    })

    it('user', done => {
        new User({_id: userID}).save(done)
    })

    it('star create', done => {
        const star = new Star({
            _id: starID,
            snippet: snippetID,
            user: userID
        })

        star
            .save()
            .then(saved => {
                log(saved)
                done()
            })
            .catch(done)
    })

    it.only('star remove', done => {
        const star = new Star({
            _id: starID,
            snippet: snippetID,
            user: userID
        })

        star
            .remove()
            .then(removed => {
                log(removed)
                done()
            })
            .catch(done)
    })
})