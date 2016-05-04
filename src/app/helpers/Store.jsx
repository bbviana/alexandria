class Store {
    state = null

    listeners = new Set();

    getState() {
        if (!this.state) {
            this.state = {}

            for (let propertyName in this) {
                if (!this.hasOwnProperty(propertyName)) {
                    continue
                }
                this.state[propertyName] = this[propertyName]
            }
        }

        return this.state
    }


    listen(listener) {
        this.listeners.add(listener)
    }

    unlisten(listener) {
        this.listeners.delete(listener)
    }


    dispatch(newState) {
        // FIXME esse setState está forçando a renderização da tela inteira (teste em Create)
        if (this.state) {
            Object.assign(this.state, newState);
        }
        this.listeners.forEach(it => it.setState(newState))
    }
}

export default Store
