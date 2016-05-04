import {browserHistory} from 'react-router'
import snippetStore from '~/app/stores/snippetStore'

/**
 * @param args: [string] | {query, path}
 */
export function navigate(args) {
    if (typeof args === 'string') {
        args = {path: args}
    }

    browserHistory.push({
        pathname: args.path,
        query: args.query
    })
}

export function gotoCreate() {
    navigate('create')
}

export function gotoEdit(snippetId) {
    navigate(`/edit/${snippetId}`)
}

export function gotoView(snippetId) {
    navigate(`/view/${snippetId}`)
}

export function gotoSearch(query) {
    navigate({
        path: `/search`,
        query: {query: query, page: 1}
    })
}