import {List, Map, Record} from 'immutable'
import {browserHistory} from 'react-router'
import {Request, Store} from '../helpers'

// FIXME usar Immutable no state

class State {
    description = ''
    files = List.of({name: '', content: '', type: '', timestamp: new Date()})
    showDeleteBtn = false
}


class AppStore extends Store {
    state = new State()

    // actions

    addFile() {
        let files = this.state.files.push({timestamp: new Date()})
        this.dispatch({
            files: files,
            showDeleteBtn: files.count() > 1
        })
    }

    removeFile(file) {
        let files = this.state.files
        let indexToRemove = files.indexOf(file)
        files = files.delete(indexToRemove)

        this.dispatch({
            files: files,
            showDeleteBtn: files.count() > 1
        })
    }

    save() {
        Request
            .post('/api/snippets', this.state)
            .then(data => {
                this.state = new State()

                browserHistory.push({
                    pathname: `view/${data._id}`
                })
            })
    }

    load(id) {
        Request
            .get(`/api/snippets/${id}`)
            .then(data => {
                this.dispatch(data)
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


}

export default new AppStore()