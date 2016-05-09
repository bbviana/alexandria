import { Router } from 'express'
import controller from '../controllers/snippets'

export default new Router()
    .get('/search', controller.search)
    .get('/:id', controller.load)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.remove)
