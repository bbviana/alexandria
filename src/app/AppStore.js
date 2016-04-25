import {List, Map, Record} from 'immutable'
import {browserHistory} from 'react-router'
import {Request, Store} from './helpers'

// FIXME usar Immutable no state

class State {
    _id = null
    created = null
    description = ''
    files = [{name: '', content: '', type: ''}]
    user = "bbviana"

    currentPage = null
    languages = []
    query = null
    results = []
    selectedLanguage = null
    totalPages = null
    totalResults = null
}


class AppStore extends Store {
    state = new State()

    // Snippet

    search(args) {
        args = args || {}
        const query = args.query || this.state.query
        const language = args.language || this.state.selectedLanguage
        const page = args.page || this.state.currentPage

        if (!query) return

        Request
            .get(`/api/snippets/search`, {query, language, page})
            .then(data => {
                this.dispatch(data)
            })
    }

    remove(id) {
        Request
            .del(`/api/snippets/${id}`)
            .then(data => {
                window.location = '/'
            })
    }

    load(id) {
        Request
            .get(`/api/snippets/${id}`)
            .then(data => {
                this.dispatch(data)
            })

    }

    create() {
        Request
            .post('/api/snippets', this.state)
            .then(data => {
                this.gotoView(data._id)
            })
    }

    save() {
        Request
            .put(`/api/snippets/${this.state._id}`, this.state)
            .then(data => {
                this.gotoView(data._id)
            })
    }


    // File

    addFile() {
        let files = this.state.files
        files.push({})

        this.dispatch({
            files: files
        })
    }

    removeFile(file) {
        let files = this.state.files
        let indexToRemove = files.indexOf(file)
        files.splice(indexToRemove, 1)

        this.dispatch({
            files: files
        })
    }

    // change handlers

    changeDescription(newDescription) {
        this.state.description = newDescription

        this.dispatch({
            description: this.state.description
        })
    }

    changeFileContent(file, newContent) {
        file.content = newContent

        this.dispatch({
            files: this.state.files
        })
    }

    changeFileName(file, newName) {
        file.name = newName || ''
        file.type = file.name.split('.')[1]

        this.dispatch({
            files: this.state.files
        })
    }

    changeQuery(newValue) {
        this.dispatch({
            query: newValue
        })
    }


    // Navigation

    gotoCreate() {
        browserHistory.push({
            pathname: `/create`
        })
    }

    gotoEdit(snippetId) {
        browserHistory.push({
            pathname: `/edit/${snippetId}`
        })
    }

    gotoView(snippetId) {
        browserHistory.push({
            pathname: `/view/${snippetId}`
        })
    }

    gotoSearch(query) {
        browserHistory.push({
            pathname: '/search',
            query: {query: query, page: 1}
        })
    }


}

// FIXME remover
window.store = new AppStore()

export default window.store