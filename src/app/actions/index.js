import Request from '~/app/helpers/Request'

// APP

export function flashMessage(message) {
    return {
        type: 'ADD_FLASH_MESSAGE',
        message: message
    }
}

export function clearFlashMessage() {
    return {
        type: 'CLEAR_FLASH_MESSAGE'
    }
}

// LOGGED USER

// TODO adicionar cache
export const loadUser = (dispatch) => {
    Request
        .get('/api/users/logged')
        .then(data => {
            dispatch({
                type: 'USER_LOGIN_SUCCESS',
                user: data
            })
        })
}


//  SEARCH

export function changeQuery(newValue) {
    return {
        type: 'CHANGE_QUERY',
        query: newValue
    }
}

export function search(dispatch, state, args) {
    args = args || {}
    const query = args.query || state.query
    const language = args.language || state.selectedLanguage
    const page = args.page || state.currentPage

    if (!query) return

    Request
        .get(`/api/snippets/search`, {query, language, page})
        .then(data => {
            dispatch(receiveSnippets(data))
        })
}

// SNIPPET

export function remove(dispatch, id) {
    Request
        .del(`/api/snippets/${id}`)
        .then(data => {
            dispatch(flashMessage('Snippet removido com sucesso'))
            gotoCreate()
        })
}

export function load(dispatch, id) {
    Request
        .get(`/api/snippets/${id}`)
        .then(data => {
            dispatch(receiveSnippet(data))
        })

}

export function create(snippet) {
    Request
        .post('/api/snippets', snippet)
        .then(data => {
            gotoView(data._id)
        })
}

export function save() {
    Request
        .put(`/api/snippets/${this.state._id}`, this.state)
        .then(data => {
            gotoView(data._id)
        })
}

export function receiveSnippet(snippet) {
    return {
        type: 'RECEIVE_SNIPPET',
        snippet
    }
}

// change handlers

export function changeSnippet(property, value) {
    return {
        type: 'CHANGE_SNIPPET',
        property,
        value
    }
}

export function changeFileContent(file, content) {
    return {
        type: 'CHANGE_FILE_CONTENT',
        file,
        content
    }
}

export function changeFileName(file, name) {
    return {
        type: 'CHANGE_FILE_NAME',
        file,
        name
    }
}


// FILE

export function addFile() {
    return {
        type: 'ADD_FILE'
    }
}

export function removeFile(file) {
    return {
        type: 'REMOVE_FILE',
        file
    }
}

export function receiveSnippets(result) {
    return {
        type: 'RECEIVE_SNIPPETS',
        currentPage: result.currentPage,
        languages: result.languages,
        results: result.results,
        selectedLanguage: result.selectedLanguage,
        totalPages: result.totalPages,
        totalResults: result.totalResults
    }
}


// NAVIGATION

import {browserHistory} from 'react-router'

/**
 * @param args: [string] | {query, path}
 */
export function navigate(args) {
    if (typeof args === 'string') {
        args = {path: args}
    }

    browserHistory.push({
        pathname: args.path,
        query: args.query
    })
}

export function gotoCreate() {
    navigate('create')
}

export function gotoEdit(snippetId) {
    navigate(`/edit/${snippetId}`)
}

export function gotoView(snippetId) {
    navigate(`/view/${snippetId}`)
}

export function gotoSearch(query) {
    navigate({
        path: `/search`,
        query: {query: query, page: 1}
    })
}
