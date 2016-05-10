const initialFileState = {
    name: null,
    content: null,
    type: null
}

const file = (state = initialFileState, action) => {
    switch (action.type) {
        case 'CHANGE_FILE_NAME':
            const { name } = action;
            return Object.assign({}, state, {
                name,
                type: name.split('.')[1]
            })

        case 'CHANGE_FILE_CONTENT':
            return Object.assign({}, state, {
                content: action.content
            })

        default:
            return state
    }
}

const initialState = []

const files = (state = initialState, action) => {
    switch (action.type) {
        case 'RECEIVE_SNIPPET':
            return actions.snippet.files

        case 'ADD_FILE':
            return [...state, initialFileState];

        case 'REMOVE_FILE':
        {
            const index = state.indexOf(action.file)
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
        }
        case 'CHANGE_FILE_NAME':
        case 'CHANGE_FILE_CONTENT':
        {
            const index = state.indexOf(action.file)
            return [
                ...state.slice(0, index),
                file(action.file, action),
                ...state.slice(index + 1)
            ]
        }

        default:
            return state
    }
}

export default files