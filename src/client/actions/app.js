// APP

export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: {
        message
    }
})

export const clearMessage = () => ({
    type: 'CLEAR_MESSAGE'
})


//  SEARCH

export const changeQuery = (query) => ({
    type: 'CHANGE_QUERY',
    payload: {
        query
    }
})


export const changeSnippet = (property, value) => ({
    type: 'CHANGE_SNIPPET',
    payload: {
        property,
        value
    }
})

export const changeFileContent = (file, content) => ({
    type: 'CHANGE_FILE_CONTENT',
    payload: {
        file,
        content
    }
})

export const changeFileName = (file, name) => ({
    type: 'CHANGE_FILE_NAME',
    payload: {
        file,
        name
    }
})


export const addFile = () => ({
    type: 'ADD_FILE'
})

export const removeFile = (file) => ({
    type: 'REMOVE_FILE',
    payload: {
        file
    }
})