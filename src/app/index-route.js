import express, {Router} from 'express'

export default new Router()
    .get('/', (req, res) => {
        res.json({message: 'OK'})
    })
