const initialState = {
    currentPage: null,
    languages: [],
    query: null,
    results: [],
    selectedLanguage: null,
    totalPages: null,
    totalResults: null
};

const snippets = (state = initialState, action) => {
    const {payload} = action

    switch (action.type) {
        case 'CHANGE_QUERY':
            return Object.assign({}, state, {
                query: payload.query
            });

        case 'RECEIVE_SNIPPETS':
            return Object.assign({}, state, {
                currentPage: payload.currentPage,
                languages: payload.languages,
                results: payload.results,
                selectedLanguage: payload.selectedLanguage,
                totalPages: payload.totalPages,
                totalResults: payload.totalResults
            });
        default:
            return state
    }
};


export default snippets