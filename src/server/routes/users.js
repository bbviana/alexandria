import { Router } from 'express'
import controller from '../controllers/users'

export default new Router()
    .get('/logged', controller.getLoggedUser)
