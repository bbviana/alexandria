import Store from '../helpers/Store'
import {List} from 'immutable'

class CreateStore extends Store {
    state = {
        files: List.of({value:'nada'}),
        showDeleteBtn: false
    }

    addFile() {
        let files = this.state.files.push({})
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

    changeFile(file, newValue){
        // FIXME usar Immutable
        file.value = newValue

        this.dispatch({
            files: this.state.files
        })
    }
}

export default new CreateStore()