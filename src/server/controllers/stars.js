import User from '../models/User'
import Snippet from '../models/Snippet'
import Star from '../models/Star'

export const star = function (req, res) {
    const user = req.user
    if(!user) throw new Error("usuário não está logado")

    const { snippetId } = req.params

    Snippet
        .findById(snippetId)
        .exec((err, snippet) => {
            err && res.send(err)

            const star = new Star({
                snippet: snippet._id,
                user: user._id
            })

            star.save(err => {
                err && res.send(err)
                // PAREI
                // verificar se ja adicionou
                snippet.stars.push(star)

                snippet.save(err => {
                    err && res.send(err)
                    res.json(snippet)
                })
            })
        })
}

export const unstar = function (req, res) {
    const user = req.user
    if(!user) throw new Error("usuário não está logado")

    const { snippetId } = req.params
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

            console.log( user._id)

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