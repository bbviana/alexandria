//region Imports
import {List, Map, Record} from 'immutable'
import {browserHistory} from 'react-router'

import Request from '~/app/helpers/Request'
import Store from '~/app/helpers/Store'
//endregion

// FIXME usar Immutable no state

class State {
    flashMessage = null

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

    // App

    clearMessage() {
        this.dispatch({
            flashMessage: null
        })
    }

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
            .then(data => this.navigate({
                    path: 'create',
                    state: {
                        flashMessage: 'Snippet removido com sucesso'
                    }
                })
            )
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

    /**
     * @param args: [string] | {query, path, state}
     */
    navigate(args) {
        if (typeof args === 'string') {
            args = {path: args}
        }

        let {query, path, state} = args

        this.state = new State()
        if(state) Object.assign(this.state, state)
        this.dispatch(this.state)

        browserHistory.push({
            pathname: path,
            query: query
        })
    }

    gotoCreate(newState) {
        this.navigate({
            path: 'create',
            state: newState
        })
    }

    gotoEdit(snippetId, newState) {
        this.navigate({
            path: `/edit/${snippetId}`,
            state: newState
        })
    }

    gotoView(snippetId, newState) {
        this.navigate({
            path: `/view/${snippetId}`,
            state: newState
        })
    }

    gotoSearch(query, newState) {
        this.navigate({
            path: `/search`,
            query: {query: query, page: 1},
            state: newState
        })
    }


}

export default new AppStore()