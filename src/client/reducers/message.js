const initialState = null

const message = (state = initialState, action) => {
    return (
        reduceMessageActions(action) ||
        reduceErrorActions(action) ||
        state
    )
}

const reduceMessageActions = (action) => {
    switch (action.type){
        case 'ADD_MESSAGE':
            return action.payload.message

        case 'CLEAR_MESSAGE':
            return ''

        default:
            return null
    }
}

const reduceErrorActions = (action) => {
    const {error} = action.meta || {}
    if (error) {
        return action.payload.message
    }

    return null
}
export default message