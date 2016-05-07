const initialState = {
    currentPage: null,
    languages: [],
    query: null,
    results: [],
    selectedLanguage: null,
    totalPages: null,
    totalResults: null
}

const snippets = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_QUERY':
            return Object.assign({}, state, {
                query: action.query
            })

        case 'RECEIVE_SNIPPETS':
            return Object.assign({}, state, {
                currentPage: action.currentPage,
                languages: action.languages,
                results: action.results,
                selectedLanguage: action.selectedLanguage,
                totalPages: action.totalPages,
                totalResults: action.totalResults
            })
        default:
            return state
    }
}


export default snippets