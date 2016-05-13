import * as t from './actionTypes'
import {actionTypes as nav} from '../navigation'

const initialFileState = {
    name: null,
    content: null,
    type: null
}

const file = (state = initialFileState, action) => {
    const { payload } = action

    switch (action.type) {
        case t.ADD:
        case nav.GOTO_CREATE:
            return Object.assign({}, initialFileState)

        case t.CHANGE_FILE:
            const file = Object.assign({}, state, payload.newValues)
            file.type = file.name && file.name.split('.')[1]
            return file

        default:
            return state
    }
}

const initialState = [initialFileState]

const files = (state = initialState, action) => {
    const { payload } = action

    switch (action.type) {
        case t.ADD:
            return [...state, file(null, action)]

        case t.CHANGE_FILE:
        {
            const index = state.indexOf(payload.file)
            return [
                ...state.slice(0, index),
                file(payload.file, action),
                ...state.slice(index + 1)
            ]
        }

        case t.REMOVE:
        {
            const index = state.indexOf(payload.file)
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
        }

        case nav.GOTO_CREATE:
            return [file(null, action)]

        case 'LOAD_SNIPPET_SUCCESS':
            return payload.files

        default:
            return state
    }
}

export default files