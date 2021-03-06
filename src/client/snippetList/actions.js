import * as t from './actionTypes'

export const changeQuery = (query) => ({
    type: t.CHANGE_QUERY,
    payload: query
})

export const search = (args) => {
    const { query, language, page } = args

    if (!query) return

    return {
        type: t.SEARCH,
        payload: {
            query,
            language,
            page
        },
        meta: {
            method: 'GET',
            url: '/api/snippets/search'
        }
    }
}


export const loadUserSnippets = (user) => {
    return {
        type: t.LOAD_USER_SNIPPETS,
        meta: {
            method: 'GET',
            url: `/api/snippets/user/${user}`
        }
    }
}

