import * as t from './actionTypes'

const initialState = {
    login: null,
    avatarURL: null
}

const loggedUser = (state = initialState, action) => {
    switch (action.type) {
        case t.LOAD_SUCCESS:
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