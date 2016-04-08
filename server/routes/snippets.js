import express, {Router} from 'express'
import {Snippet} from '../models/Snippet'
import {File} from '../models/File'
import {User} from '../models/User'

const router = new Router()
    .get('/search', (req, res) => { // search
        const searchRegex = req.query.query && new RegExp(req.query.query, 'i')
        const page = parseInt(req.query.page) || 1
        const pageSize = 2
        const language = req.query.language || new RegExp('.')

        const countByLanguages = (snippets, totalResults) =>
            Snippet
                .aggregate([
                        {
                            $match: {
                                description: searchRegex,
                                'files.type': language
                            }
                        },
                        {$unwind: "$files"},
                        {
                            $group: {
                                _id: '$files.type',
                                count: {$sum: 1}
                            }
                        },
                        {$sort: {count: -1}}
                    ],
                    (err, languages) => {
                        err && res.send(err)

                        const totalFiles = languages.reduce((acc, language) => acc + language.count, 0)

                        languages = languages.map(result => {
                            return {
                                name: result._id,
                                count: result.count,
                                percent: 100 * result.count / totalFiles
                            }
                        })

                        const totalPages = Math.ceil(totalResults / pageSize)

                        res.json({
                            currentPage: page,
                            query: req.query.query,
                            languages: languages,
                            pageSize: pageSize,
                            results: snippets,
                            selectedLanguage: req.query.language,
                            totalPages: totalPages,
                            totalResults: totalResults
                        })
                    })


        const searchSnippets = (totalResults) =>
            Snippet
                .find({
                    description: searchRegex,
                    'files.type': language
                })
                .sort({created: -1})
                .skip(pageSize * (page - 1))
                .limit(pageSize)
                .exec((err, snippets) => {
                    err && res.send(err)

                    snippets.forEach(snippet => snippet.files[0].truncate())

                    countByLanguages(snippets, totalResults)
                })


        Snippet
            .count({
                description: searchRegex,
                'files.type': language
            })
            .exec((err, count) => {
                err && res.send(err)

                searchSnippets(count)
            })
    })

    .get('/:id', (req, res) => { // load
        Snippet
            .findById(req.params.id)
            .exec((err, data) => {
                err && res.send(err)

                res.json(data)
            })
    })

    .post('/', (req, res) => { // create
        const newData = req.body

        const snippet = new Snippet({
            description: newData.description,
            files: newData.files,
            user: new User({login: "bbviana"})
        })

        snippet.save(err => {
            err && res.send(err)
            res.json(snippet)
        })
    })

    .put('/:id', (req, res) => { // update
        Snippet.findById(req.params.id, (err, snippet) => {
            err && res.send(err)

            const newData = req.body
            snippet.description = newData.description
            snippet.files = newData.files
            snippet.updated = Date.now()

            snippet.save(err => {
                err && res.send(err)
                res.json(snippet)
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
