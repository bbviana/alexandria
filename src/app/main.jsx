//region Imports
import React from 'react'
import ReactDOM from 'react-dom'
import {IndexRoute, Route, Router, browserHistory} from 'react-router'

import App from '~/app/layouts/App'

import CreateSnippet from '~/snippet/CreateSnippet'
import EditSnippet from '~/snippet/EditSnippet'
import SearchSnippet from '~/snippet/SearchSnippet'
import ViewSnippet from '~/snippet/ViewSnippet'

//endregion

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
