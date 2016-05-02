import express, {Router} from 'express'
import User from '../user/User'

const router = new Router()
    .get('/logged', (req, res) => {
        const user = req.user || {}
        res.json({
            user: {
                name: user.name,
                login: user.login,
                email: user.email,
                avatarURL: user.avatarURL,
                admin: user.admin
            }
        })
    })

export default router