import {Request, Store} from '../helpers'
import {List, Map, Record} from 'immutable'
import {hashHistory} from 'react-router'

// FIXME usar Immutable no state

class State {
    description = ''
    files = List.of({name: '', value: '', type: '', timestamp: new Date()})
    showDeleteBtn = false
}


class CreateStore extends Store {
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

                hashHistory.push({
                    pathname: `view/${data._id}`
                })
            })
    }

    // change handlers

    changeDescription(newDescription) {
        this.state.description = newDescription

        this.dispatch({
            description: this.state.description
        })
    }

    changeFileValue(file, newValue) {
        file.value = newValue

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

export default new CreateStore()