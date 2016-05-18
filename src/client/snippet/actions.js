import * as t from './actionTypes'
import { actions as nav } from '../navigation'

export const change = (newValues) => ({
    type: t.CHANGE,
    payload: newValues
})

export const create = (snippet) => ({
    type: t.CREATE,
    payload: snippet,
    meta: {
        method: 'POST',
        url: '/api/snippets',
        success: (data) => nav.gotoDetails(data._id)
    }
})

export const save = (snippet) => ({
    type: t.SAVE,
    payload: snippet,
    meta: {
        method: 'PUT',
        url: `/api/snippets/${snippet._id}`,
        success: () => nav.gotoDetails(snippet._id)
    }
})

export const remove = (id) => ({
    type: t.REMOVE,
    meta: {
        method: 'DELETE',
        url: `/api/snippets/${id}`,
        success: nav.gotoCreate
    }
})

export const load = (id) => ({
    type: t.LOAD,
    meta: {
        method: 'GET',
        url: `/api/snippets/${id}`
    }
})

export const star = (id) => ({
    type: t.STAR,
    meta: {
        method: 'POST',
        url: `/api/star/add/${id}`
    }
})

export const unstar = (id) => ({
    type: t.UNSTAR,
    meta: {
        method: 'POST',
        url: `/api/star/remove/${id}`
    }
})

// files

export const addFile = () => ({
    type: t.ADD_FILE
})

export const changeFile  = (file, newValues) => ({
    type: t.CHANGE_FILE,
    payload: {
        file,
        newValues
    }
})

export const removeFile = (file) => ({
    type: t.REMOVE_FILE,
    payload: {
        file
    }
})