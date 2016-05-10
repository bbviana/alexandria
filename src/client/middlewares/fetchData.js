import Request from '~/utils/Request'


export default function fetch({ dispatch, getState }) {
    return next => action => {
        const {
            method,
            url,
            data,
            onSuccess
            } = action

        if (action.type !== 'FETCH_DATA') {
            return next(action)
        }

        Request
            .execute(method, url, data)
            .then(data => {
                dispatch({
                    type: onSuccess,
                    data
                })
            })

    }
}
