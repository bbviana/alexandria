import User from '../models/User'
import Snippet from '../models/Snippet'

export const search = function (req, res) {
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
            .populate('user')
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

            console.log( user._id)

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

    const newData = req.body;

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

