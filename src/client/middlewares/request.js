import Request from '~/utils/Request'


/**
 * dispatch({
 *      type: 'LOAD_USER',
 *      payload: {
 *          id: 42
 *      },
 *      meta: {
 *          method: 'GET',
 *          url: 'api/users/
 *      }
 * })
 *
 * ---
 *
 * [middleware]
 *
 * dispatch({
 *      type: 'LOAD_USER',
 *      payload,
 *      meta: {
 *          pending: true
 *      }
 * })
 *
 * ---
 *
 * [success]
 *
 * dispatch({
 *      type: 'LOAD_USER_SUCCESS',
 *      payload
 * })
 *
 * ---
 *
 * [failure]
 *
 * dispatch({
 *      type: 'LOAD_USER_FAILURE',
 *      payload: {
 *          message: error
 *      }
 * })
 *
 */
export default function request({ dispatch }) {
    return next => action => {
        const {
            method,
            url,
            success
            } = action.meta || {}

        if (url === undefined) {
            return next(action)
        }

        const {
            type,
            payload,
            } = action

        dispatch({
            type,
            payload,
            meta: {
                pending: true
            }
        })

        Request
            .execute(method, url, payload)
            .then(
                data => {
                    dispatch({
                        type: `${type}_SUCCESS`,
                        payload: data,
                        meta: {
                            pending: false
                        }
                    })

                    success &&
                    dispatch(success(data))
                },

                errorMessage => {
                    dispatch({
                        type: `${type}_FAILURE`,
                        payload: {
                            message: errorMessage
                        },
                        meta: {
                            error: true,
                            pending: false
                        }
                    })

                    console.error(error)
                }
            )
    }
}
