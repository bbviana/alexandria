class Store {
    listeners = new Set();

    listen(listener){
        this.listeners.add(listener)
    }

    unlisten(listener){
        this.listeners.delete(listener)
    }

    dispatch(newState){
        // FIXME esse setState esta forçando a renderização da tela inteira (teste em Create)
        if(this.state){
            Object.assign(this.state, newState);
        }
        this.listeners.forEach(it => it.setState(newState))
    }
}

export default Store