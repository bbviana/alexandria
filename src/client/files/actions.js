import * as t from './actionTypes'

export const add = () => ({
    type: t.ADD
})

export const changeFile  = (file, newValues) => ({
    type: t.CHANGE_FILE,
    payload: {
        file,
        newValues
    }
})

export const remove = (file) => ({
    type: t.REMOVE,
    payload: {
        file
    }
})