const initialState = {
    login: null,
    avatar: null
}

const loggedUser = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            const {user} = action
            return {
                login: user.login,
                avatar: user.avatar
            }
        default:
            return state
    }
}

export default loggedUser