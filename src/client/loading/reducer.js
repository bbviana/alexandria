
const initialState = false

const loading = (state = initialState, action) => {
    const {pending} = action.meta || {}

    if(pending === undefined) {
        return state
    }

    return pending === true
}

export default loading