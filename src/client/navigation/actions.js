import * as t from './actionTypes'

export const gotoCreate = () => ({
    type: t.GOTO_CREATE,
    meta: {
        path: '/create'
    }
})

export const gotoEdit = (snippetId) => ({
    type: t.GOTO_EDIT,
    meta: {
        path: `/edit/${snippetId}`
    }
})

export const gotoDetails = (snippetId) => ({
    type: t.GOTO_DETAILS,
    meta: {
        path: `/details/${snippetId}`
    }
})

export const gotoSearch = (query) => ({
    type: t.GOTO_SEARCH,
    meta: {
        path: `/search/`,
        query: {
            query,
            page: 1
        }
    }
})