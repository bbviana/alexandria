import express, {Router} from 'express'
import pessoas from './pessoas'

const index = new Router()
    .get('/', (req, res) => {
        res.json({message: 'OK'})
    })

export {
    index,
    pessoas
}
