const initialState = null

const message = (state = initialState, action) => {
    return action.message || null
}

export default message