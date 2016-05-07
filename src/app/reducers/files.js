const initialFileState = {
    name: null,
    content: null,
    type: null
}

const file = (state = initialFileState, action) => {
    switch (action.type) {
        case 'CHANGE_FILE_NAME':
            const { name } = action
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
            return state.concat(initialFileState)

        case 'REMOVE_FILE':
            const indexToRemove = state.indexOf(action.file)
            return state.splice(indexToRemove, 1) // FIXME

            // PAREI AQUI.
            // devemos retornar uma lista de files, nao um file
            // é preciso quebrar o array em dois e colocar o novo file no meio
        case 'CHANGE_FILE_NAME':
        case 'CHANGE_FILE_CONTENT':
            return file(action.file, action)


        default:
            return state
    }
}

export default files