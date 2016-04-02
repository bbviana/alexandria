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
        const newData = req.body

        const model = new Snippet({
            description: newData.description,
            files: newData.files
        })

        model.save(err => {
            err && res.send(err)

            res.json(model)
        })
    })

    .put('/:id', (req, res) => { // update
        Snippet.findById(req.params.id, (err, data) => {
            err && res.send(err)

            const newData = req.body
            data.description = newData.description
            data.files = newData.files

            data.save(err => {
                err && res.send(err)
                res.end()
            })
        })

    })

    .delete('/:id', (req, res) => { // delete
        console.log('renove ' + req.params.id)
        Snippet.remove({_id: req.params.id}, err => {
            err && res.send(err)
            res.end()
        })
    })

export default router
