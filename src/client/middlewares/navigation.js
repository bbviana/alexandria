import { browserHistory } from 'react-router'

export default function navigation({ dispatch, getState }) {
    return next => action => {

        browserHistory.push({
            pathname: action.pathname,
            query: action.query
        })
    }
}
