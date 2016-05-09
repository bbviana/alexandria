const initialState = {
    flashMessage: null
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FLASH_MESSAGE':
            return Object.assign({}, state, {flashMessage: action.message})

        case 'CLEAR_FLASH_MESSAGE':
            return Object.assign({}, state, {flashMessage: null})

        default:
            return state
    }
}

export default app