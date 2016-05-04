import Request from '~/app/helpers/Request'
import appStore from '~/app/stores/appStore'

export function flashMessage(msg) {
    appStore.dispatch({
        flashMessage: msg
    })
}

export function clearFlashMessage() {
    appStore.dispatch({
        flashMessage: null
    })
}

export function loadUser() {
    Request
        .get('/api/users/logged')
        .then(data => {
            appStore.dispatch({loggedUser: data})
        })
}