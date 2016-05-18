import { Router } from 'express'
import * as controller from '../controllers/snippets'

export default new Router()
    .get('/search', controller.search)
    .get('/:id', controller.load)
    .get('/user/:user', controller.listByUser)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.remove)
