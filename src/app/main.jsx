import React from 'react'
import ReactDOM from 'react-dom'
import {IndexRoute, Router, Route, browserHistory} from 'react-router'
import {App} from './layouts'
import {CreateSnippet, EditSnippet, SearchSnippet, ViewSnippet} from '../snippet'

const router = (
    <Router history={browserHistory}>
        <Route path="/" component={CreateSnippet}/>
        <Route path="create" component={CreateSnippet}/>
        <Route path="view/:id" component={ViewSnippet}/>
        <Route path="search" component={SearchSnippet}/>
        <Route path="edit/:id" component={EditSnippet}/>
    </Router>
)

ReactDOM.render(router, document.getElementById('app'))
