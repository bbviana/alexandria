import express, {Router} from 'express'
import {Snippet} from '../models'


const router = new Router()
    .get('/', (req, res) => { // list
        Snippet
            .find({description: new RegExp(req.query.description, 'i')})
            //.populate('parent', 'name')
            .exec((err, data) => {
                err && res.send(err)
                res.json({
                    data: data
                })
            })
    })

    .get('/:id', (req, res) => { // load
        Snippet
            .findById(req.params.id)
            //.populate('parent', 'name')
            .exec((err, data) => {
                err && res.send(err)

                res.json(data)
            })
    })

    .post('/', (req, res) => { // create
        const data = new Snippet()
        data.description = req.body.description

        console.log(data)

        data.save(err => {
            err && res.send(err)

            res.json(data)
        })
    })

    .put('/:id', (req, res) => { // update
        Snippet.findById(req.params.id, (err, data) => {
            err && res.send(err)

            data.description = req.body.description

            data.save(err => {
                err && res.send(err)
                res.end()
            })
        })

    })

    .delete('/:id', (req, res) => { // delete
        Snippet.remove({_id: req.params.id}, err => {
            err && res.send(err)
            res.end()
        })
    })

export default router
