const initialState = {
    login: null,
    avatarURL: null
}

const loggedUser = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            const user = action.payload || {}
            return {
                login: user.login,
                avatarURL: user.avatarURL
            }
        default:
            return state
    }
}

export default loggedUser