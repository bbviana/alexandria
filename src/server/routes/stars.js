import { Router } from 'express'
import * as controller from '../controllers/stars'

export default new Router()
    .get('/:user', controller.listStarredByUser)
    .post('/add/:snippetId', controller.star)
    .post('/remove/:snippetId', controller.unstar)
