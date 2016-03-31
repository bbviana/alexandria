import {Request, Store} from '../helpers'
import {List, Map, Record} from 'immutable'
import {hashHistory} from 'react-router'

// FIXME usar Immutable no state

class State {
    description = ''
    files = List.of({name: '', value: '', type: '', timestamp: new Date()})
}


class ViewStore extends Store {
    state = new State()

    load(id) {
        Request
            .get(`api/snippets/${id}`)
            .then(data => {
                this.dispatch(data)
            })

    }

}

export default new ViewStore()