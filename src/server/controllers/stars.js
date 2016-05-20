import User from '../models/User'
import Snippet from '../models/Snippet'
import Star from '../models/Star'

export const star = function (req, res) {
    const user = req.user
    if (!user) throw new Error("usuário não está logado")

    const { snippetId } = req.params

    const star = new Star({
        snippet: snippetId,
        user: user._id
    })

    star.save((err, saved) => {
        res.status(200)
    })
}

export const unstar = function (req, res) {
    const user = req.user
    if (!user) throw new Error("usuário não está logado")

    const { snippetId } = req.params

    Star.find({
            snippet: snippetId,
            user: user._id
        })
        .exec((err, star) => {
            err && res.send(err)

            star.remove().then(() => res.status(200))
        })
}

