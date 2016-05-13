import * as t from './actionTypes'

export const add = (message) => ({
    type: t.ADD,
    payload: {
        message
    }
})

export const clear = () => ({
    type: t.CLEAR
})