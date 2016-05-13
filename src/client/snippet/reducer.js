import * as t from './actionTypes'
import { actionTypes as nav } from '../navigation'

const initialState = {
    _id: null,
    created: null,
    description: '',
    user: {}
}

const snippet = (state = initialState, action) => {
    const { payload } = action

    switch (action.type) {
        case t.CHANGE:
            return Object.assign({}, state, payload)

        case nav.GOTO_CREATE:
            return {...initialState}

        case t.LOAD_SUCCESS:
            return {...payload}

        default:
            return state
    }
}


export default snippet