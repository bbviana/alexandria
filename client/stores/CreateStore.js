import Store from '../helpers/Store'
import {List, Map, Record} from 'immutable'

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

    save(){
        this.dispatch(new State())
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