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
        success: () => nav.gotoView(snippet._id)
    }
})

export const remove = (id) => ({
    type: t.REMOVE,
    payload: {
        id
    },
    meta: {
        method: 'DELETE',
        url: `/api/snippets/${id}`,
        success: nav.gotoCreate
    }
})

export const load = (id) => ({
    type: t.LOAD,
    payload: {
        id
    },
    meta: {
        method: 'GET',
        url: `/api/snippets/${id}`
    }
})