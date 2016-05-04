import Store from '~/app/helpers/Store'

class AppStore extends Store {
    loggedUser = {
        login: null,
        avatar: null
    }

    flashMessage = null
}

export default new AppStore()