import * as nav from './nav'

export const loadLoggedUser = () => {
    return {
        type: 'LOAD_USER',
        meta: {
            method: 'GET',
            url: '/api/users/logged'
        }
    }
}

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

    //Request
    //    .del(`/api/snippets/${id}`)
    //    .then(data => {
    //        dispatch(flashMessage('Snippet removido com sucesso'))
    //        gotoCreate()
    //    })
})

export const load = (id) => ({
    type: 'LOAD_SNIPPET',
    meta: {
        method: 'GET',
        url: `/api/snippets/${id}`
    }

    //Request
    //    .get(`/api/snippets/${id}`)
    //    .then(data => {
    //        dispatch(receiveSnippet(data))
    //    })

})

export const search = (state, args) => {
    args = args || {}

    const query = args.query || state.query

    if (!query) return

    const language = args.language || state.selectedLanguage
    const page = args.page || state.currentPage

    return {
        type: 'SEARCH',
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

    //Request
    //    .get(`/api/snippets/search`, {query, language, page})
    //    .then(data => {
    //        dispatch(receiveSnippets(data))
    //    })
}



