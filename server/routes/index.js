import express, {Router} from 'express'
import snippets from './snippets'

const index = new Router()
    .get('/', (req, res) => {
        res.json({message: 'OK'})
    })

export {
    index,
    snippets
}
