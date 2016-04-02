import {List, Map, Record} from 'immutable'
import {browserHistory} from 'react-router'
import {Request, Store} from '../helpers'

// FIXME usar Immutable no state

class State {
    _id = null
    description = ''
    files = [{name: '', content: '', type: ''}]
    user = "bbviana"
}


class AppStore extends Store {
    state = new State()

    // Snippet

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

    save() {
        Request
            .post('/api/snippets', this.state)
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


    // Navigation

    gotoEdit(snippetId){
        browserHistory.push({
            pathname: `/edit/${snippetId}`
        })
    }

    gotoView(snippetId){
        browserHistory.push({
            pathname: `/view/${snippetId}`
        })
    }

}

export default new AppStore()