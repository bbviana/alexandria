import * as t from './actionTypes'
import { actionTypes as nav } from '../navigation'

const initialFileState = {
    name: null,
    content: null,
    type: null
}

const initialState = {
    _id: null,
    created: null,
    description: '',
    files: [initialFileState],
    user: {}
}

const snippet = (state = initialState, action) => {
    const { payload } = action

    switch (action.type) {
        case t.CHANGE:
            return Object.assign({}, state, payload)

        case nav.GOTO_CREATE:
            return {...initialState}

        case t.LOAD_SUCCESS:
            return {...payload}

        case t.ADD_FILE:
        case t.CHANGE_FILE:
        case t.REMOVE_FILE:
            return Object.assign({}, state, {files: files(state.files, action)})

        default:
            return state
    }
}

const files = (state = initialState, action) => {
    const { payload } = action

    switch (action.type) {
        case t.ADD_FILE:
            return [...state, file(null, action)]

        case t.CHANGE_FILE:
        {
            const index = state.indexOf(payload.file)
            if(index == -1){
                return state
            }

            return [
                ...state.slice(0, index),
                file(payload.file, action),
                ...state.slice(index + 1)
            ]
        }

        case t.REMOVE_FILE:
        {
            const index = state.indexOf(payload.file)
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
        }

        default:
            return state
    }
}

const file = (state = initialFileState, action) => {
    const { payload } = action

    switch (action.type) {
        case t.ADD_FILE:
            return Object.assign({}, initialFileState)

        case t.CHANGE_FILE:
            const file = Object.assign({}, state, payload.newValues)
            file.type = file.name && file.name.split('.')[1]
            return file

        default:
            return state
    }
}


export default snippet