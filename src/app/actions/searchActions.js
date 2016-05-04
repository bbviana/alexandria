import Request from '~/app/helpers/Request'
import searchStore from '~/app/stores/searchStore'

export function search(args) {
    args = args || {}
    const query = args.query || searchStore.query
    const language = args.language || searchStore.selectedLanguage
    const page = args.page || searchStore.currentPage

    if (!query) return

    Request
        .get(`/api/snippets/search`, {query, language, page})
        .then(data => {
            searchStore.dispatch(data)
        })
}

export function changeQuery(newValue) {
    searchStore.dispatch({
        query: newValue
    })
}