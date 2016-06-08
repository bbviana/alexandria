import { Router } from 'express'
import * as controller from '../users/controller'

export default new Router()
    .get('/logged', controller.getLoggedUser)
