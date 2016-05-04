import {List, Map, Record} from 'immutable'
import * as appActions from '~/app/actions/appActions'
import * as navigation from '~/app/actions/navigationActions'
import Request from '~/app/helpers/Request'
import snippetStore from '~/app/stores/snippetStore'


export function remove(id) {
    Request
        .del(`/api/snippets/${id}`)
        .then(data => {
            appActions.flashMessage('Snippet removido com sucesso')
            navigation.gotoCreate()
        })
}

export function load(id) {
    Request
        .get(`/api/snippets/${id}`)
        .then(data => {
            snippetStore.dispatch(data)
        })

}

export function create() {
    Request
        .post('/api/snippets', this.state)
        .then(data => {
            navigation.gotoView(data._id)
        })
}

export function save() {
    Request
        .put(`/api/snippets/${this.state._id}`, this.state)
        .then(data => {
            navigation.gotoView(data._id)
        })
}


// File

export function addFile() {
    let files = this.state.files
    files.push({})

    snippetStore.dispatch({
        files: files
    })
}

export function removeFile(file) {
    let files = this.state.files
    let indexToRemove = files.indexOf(file)
    files.splice(indexToRemove, 1)

    snippetStore.dispatch({
        files: files
    })
}

// change handlers

export function changeDescription(newDescription) {
    this.state.description = newDescription

    snippetStore.dispatch({
        description: this.state.description
    })
}

export function changeFileContent(file, newContent) {
    file.content = newContent

    snippetStore.dispatch({
        files: this.state.files
    })
}

export function changeFileName(file, newName) {
    file.name = newName || ''
    file.type = file.name.split('.')[1]

    snippetStore.dispatch({
        files: this.state.files
    })
}