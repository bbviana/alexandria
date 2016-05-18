import * as t from './actionTypes'

const initialState = {
    currentPage: null,
    languages: [],
    query: null,
    results: [],
    selectedLanguage: null,
    totalPages: null,
    totalResults: null,
    user: {}
}

const snippetList = (state = initialState, action) => {
    const { payload } = action

    switch (action.type) {
        case t.CHANGE_QUERY:
            return Object.assign({}, state, {
                query: payload
            })

        case t.SEARCH_SUCCESS:
            return Object.assign({}, state, {
                currentPage: payload.currentPage,
                languages: payload.languages,
                results: payload.results,
                selectedLanguage: payload.selectedLanguage,
                totalPages: payload.totalPages,
                totalResults: payload.totalResults
            })

        case t.LOAD_USER_SNIPPETS_SUCCESS:
            return Object.assign({}, state, {
                results: payload.results,
                user: payload.user
            })

        default:
            return state
    }
}


export default snippetList