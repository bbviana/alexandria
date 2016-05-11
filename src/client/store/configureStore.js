import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import navigation from '../middlewares/navigation'
import request from '../middlewares/request'

import rootReducer from '../reducers'

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(navigation, request, createLogger())
    )
}