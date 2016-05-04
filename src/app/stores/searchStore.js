import Store from '~/app/helpers/Store'


class SearchStore extends Store {
    currentPage = null
    languages = []
    query = null
    results = []
    selectedLanguage = null
    totalPages = null
    totalResults = null
}

export default new SearchStore()