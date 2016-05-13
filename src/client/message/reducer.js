import * as t from './actionTypes'

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
        case t.ADD:
            return action.payload.message

        case t.CLEAR:
            return ''

        default:
            return null
    }
}

const reduceErrorActions = (action) => {
    if (action.error) {
        // payload: Error
        return action.payload.message
    }

    return null
}

export default message