import * as t from './actionTypes'

export const load = () => ({
    type: t.LOAD,
    meta: {
        method: 'GET',
        url: '/api/users/logged'
    }
})