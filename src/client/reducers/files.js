const initialFileState = {
    name: null,
    content: null,
    type: null
}

const file = (state = initialFileState, action) => {
    const file = action.payload

    switch (action.type) {
        case 'ADD_FILE':
        case 'GOTO_CREATE':
            return Object.assign({}, initialFileState)

        case 'CHANGE_FILE_CONTENT':
            return Object.assign({}, state, {
                content: file.content
            })

        case 'CHANGE_FILE_NAME':
            const { name } = file;
            return Object.assign({}, state, {
                name,
                type: name.split('.')[1]
            })

        default:
            return state
    }
}

const initialState = [initialFileState]

const files = (state = initialState, action) => {
    const {payload} = action

    switch (action.type) {
        case 'ADD_FILE':
            return [...state, file(null, action)]

        case 'CHANGE_FILE_CONTENT':
        case 'CHANGE_FILE_NAME':
        {
            const index = state.indexOf(payload.file)
            return [
                ...state.slice(0, index),
                file(payload.file, action),
                ...state.slice(index + 1)
            ]
        }

        case 'REMOVE_FILE':
        {
            const index = state.indexOf(payload.file)
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
        }

        case 'GOTO_CREATE':
            return [file(null, action)]

        case 'LOAD_SNIPPET_SUCCESS':
            return payload.files

        default:
            return state
    }
}

export default files