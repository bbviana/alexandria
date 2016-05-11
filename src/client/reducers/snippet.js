const initialState = {
    _id: null,
    created: null,
    description: '',
    user: {}
}

const snippet = (state = initialState, action) => {
    const {payload} = action

    switch (action.type) {
        case 'CHANGE_SNIPPET':
            return Object.assign({}, state, {
                [payload.property]: payload.value
            })

        case 'GOTO_CREATE':
            return Object.assign({}, initialState)

        case 'LOAD_SNIPPET_SUCCESS':
            return {...payload}

        default:
            return state
    }
}


export default snippet