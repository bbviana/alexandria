import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import addDispatchToAction from '../../utils/add-dispatch-to-action'

import rootReducer from '../reducers'

const logger = createLogger()

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(logger, addDispatchToAction)
    )
}