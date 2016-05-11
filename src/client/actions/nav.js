export const gotoCreate = () => ({
    type: 'GOTO_CREATE',
    meta: {
        path: '/create'
    }
})

export const gotoEdit = (snippetId) => ({
    type: 'GOTO_EDIT',
    meta: {
        path: `/edit/${snippetId}`
    }
})

export const gotoView = (snippetId) => ({
    type: 'GOTO_VIEW',
    meta: {
        path: `/view/${snippetId}`
    }
})

export const gotoSearch = (query) => ({
    type: 'GOTO_SEARCH',
    meta: {
        path: `/search/`,
        query: {
            query,
            page: 1
        }
    }
})