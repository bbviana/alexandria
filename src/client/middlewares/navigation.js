import { browserHistory } from 'react-router'


/**
 * dispatch({
 *      type: 'GOTO_HOME',
 *      meta: {
 *          path: '/home',
 *          query: {
 *              showUser: true
 *          }
 *      }
 * })
 */
export default function navigation({dispatch}) {
    return next => action => {
        const {path, query} = action.meta || {}

        if (path === undefined) {
            return next(action)
        }

        dispatch({
            type: action.type
        })

        browserHistory.push({
            pathname: path,
            query: query
        })
    }
}
