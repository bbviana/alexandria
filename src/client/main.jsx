import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRoute, Route, Router, browserHistory } from 'react-router'

import configureStore from './configureStore'
const store = configureStore()

//import app from './app'
//const { App } = app.components

import snippet from './snippet'
const { CreatePage, EditPage, DetailsPage } = snippet.components

import snippetList from './snippetList'
const { SearchPage } = snippetList.components


const router = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={CreatePage} />
            <Route path="create" component={CreatePage} />
            <Route path="details/:id" component={DetailsPage} />
            <Route path="edit/:id" component={EditPage} />
            <Route path="search" component={SearchPage} />
        </Router>
    </Provider>
)

ReactDOM.render(router, document.getElementById('app'))
