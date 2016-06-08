import { expect }  from 'chai'
import db from '../../db'

import scenario from './scenario'
import * as controller from '../controller'
import Snippet from '../Snippet'

before(scenario)

//after(done => {
//    db.dropDatabase(done)
//})

describe('snippets', () => {
    it('search', done => {
        const req = {
            query: {
                query: '.'
            }
        }
        const res = {
            json(json){
                console.log(json)
                done()
            }
        }

        controller.search(req, res)
    })

})