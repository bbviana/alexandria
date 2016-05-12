import * as nav from './nav'

export const loadLoggedUser = () => ({
    type: 'LOAD_USER',
    meta: {
        method: 'GET',
        url: '/api/users/logged'
    }
})

export const create = (snippet) => ({
    type: 'CREATE_SNIPPET',
    payload: snippet,
    meta: {
        method: 'POST',
        url: '/api/snippets',
        success: (data) => nav.gotoView(data._id)
    }
})

export const save = (snippet) => ({
    type: 'SAVE_SNIPPET',
    payload: snippet,
    meta: {
        method: 'PUT',
        url: `/api/snippets/${snippet._id}`,
        success: () => nav.gotoView(snippet._id)
    }
})

export const remove = (id) => ({
    type: 'REMOVE_SNIPPET',
    meta: {
        method: 'DELETE',
        url: `/api/snippets/${id}`,
        success: nav.gotoCreate
    }
})

export const load = (id) => ({
    type: 'LOAD_SNIPPET',
    meta: {
        method: 'GET',
        url: `/api/snippets/${id}`
    }
})

export const search = (args) => {
    const {query, language, page} = args

    if (!query) return

    return {
        type: 'SEARCH_SNIPPETS',
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