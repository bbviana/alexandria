const initialState = {
    _id: null,
    created: null,
    description: '',
    user: {}
}

const snippet = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_SNIPPET':
            return Object.assign({}, state, {
                [action.property]: action.value
            })

        case 'CLEAR_SNIPPET':
            return initialState

        case 'RECEIVE_SNIPPET':
            return {...action.snippet}

        default:
            return state
    }
}


export default snippet