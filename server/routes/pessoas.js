import express, {Router} from 'express'
import Pessoa from '../models/Pessoa'


const router = new Router()
    .get('/', (req, res) => { // list
        Pessoa
            .find({name: new RegExp(req.query.name, 'i')})
            .populate('parent', 'name')
            .exec((err, data) => {
                err && res.send(err)
                res.json({data: data, paging: {}})
            })
    })

    .get('/blank', (req, res) => { //  blank
        const category = new Pessoa()
        category._id = null

        const associations = {}

        Pessoa.find((err, categories) => {
            associations.categories = categories

            res.json({
                data: category,
                associations: associations
            })
        })
    })

    .get('/:id', (req, res) => { // load
        Pessoa
            .findById(req.params.id)
            .populate('parent', 'name')
            .exec((err, category) => {
                err && res.send(err)

                const associations = {}

                Pessoa.find((err, categories) => {
                    associations.categories = categories

                    res.json({
                        data: category,
                        associations: associations
                    })
                })
            })
    })

    .post('/', (req, res) => { // create
        const category = new Pessoa()
        category.name = req.body.name
        category.parent = req.body.parent && req.body.parent._id
        category.main = true

        console.log(category);

        category.save(err => {
            err && res.send(err)
            res.end()
        })

    })

    .put('/:id', (req, res) => { // update
        Pessoa.findById(req.params.id, (err, category) => {
            err && res.send(err)

            category.name = req.body.name
            category.parent = req.body.parent && req.body.parent._id
            category.main = req.body.main

            category.save(err => {
                err && res.send(err)
                res.end()
            })
        })

    })
    .delete('/:id', (req, res) => { // delete
        Pessoa.remove({_id: req.params.id}, (err, category) => {
            err && res.send(err)
            res.end()
        })
    })

export default router
