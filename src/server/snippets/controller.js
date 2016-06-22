import async from 'async'
import Snippet from './Snippet'
import User from '../users/User'


export const search = function (req, res) {
    const { query } = req
    const description = query.query && new RegExp(query.query, 'i')
    const language = query.language || new RegExp('.')
    const page = parseInt(query.page) || 1
    const pageSize = 2

    async.parallel({
            totalResults: callback => Snippet.total(description, language, callback),
            snippets: callback => Snippet.search(description, language, page, pageSize, callback),
            languages: callback => Snippet.totalByLanguages(description, language, callback)
        },
        (err, results) => {
            err && res.send(err)

            const { totalResults, snippets, languages } = results
            const totalPages = Math.ceil(totalResults / pageSize)

            res.json({
                currentPage: page,
                query: query.query,
                languages,
                pageSize,
                results: snippets,
                selectedLanguage: query.language,
                totalPages,
                totalResults
            })
        })
}

export const listByUser = function (req, res) {
    const login = req.params.user

    if (!login) throw new Error('login undefined')

    User
        .findOne({
            login
        })
        .exec((err, user) => {
            err && res.send(err)

            console.log(user._id)

            Snippet
                .find({
                    user: user._id
                })
                .populate('user')
                .sort({created: -1})
                .exec((err, snippets) => {
                    err && res.send(err)

                    snippets.forEach(snippet => snippet.files[0].truncate())

                    res.json({
                        results: snippets,
                        user: user
                    })
                })
        })
}

export const listStarredByUser = function (req, res) {
    const login = req.params.user

    if (!login) throw new Error('login undefined')

    User
        .findOne({
            login
        })
        .exec((err, user) => {
            err && res.send(err)

            console.log(user._id)

            Star
                .find({
                    user: user._id
                })
                .populate('user')
                .sort({created: -1})
                .exec((err, snippets) => {
                    err && res.send(err)

                    snippets.forEach(snippet => snippet.files[0].truncate())

                    res.json({
                        results: snippets,
                        user: user
                    })
                })
        })
}

export const load = function (req, res) {
    Snippet
        .findById(req.params.id)
        .populate('user')
        .exec((err, data) => {
            err && res.send(err)

            res.json(data)
        })
}

export const create = function (req, res) {
    if (!req.user) {
        throw "usuário não está logado"
    }

    const newData = req.body

    const snippet = new Snippet({
        description: newData.description,
        files: newData.files,
        user: req.user.id
    });

    snippet.save(err => {
        err && res.send(err)
        res.json(snippet)
    })
}

export const update = function (req, res) {
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

}

export const remove = function (req, res) {
    Snippet.remove({_id: req.params.id}, err => {
        err && res.send(err)
        res.end()
    })
}

