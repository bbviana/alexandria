import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRoute, Route, Router, browserHistory } from 'react-router'

import App from './components/Layout/App'
import configureStore from './store/configureStore'

import CreateSnippet from './components/CreateSnippet'
import EditSnippet from './components/EditSnippet'
import SearchSnippets from './components/SearchSnippets'
//import UserSnippets from './components/UserSnippets'
import ViewSnippet from './components/ViewSnippet'


const store = configureStore()

const router = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={CreateSnippet}/>
            <Route path="create" component={CreateSnippet}/>
            <Route path="view/:id" component={ViewSnippet}/>
            <Route path="edit/:id" component={EditSnippet}/>
            <Route path="search" component={SearchSnippets}/>
        </Router>
    </Provider>
)

//<Route path=":user" component={UserSnippets} />

ReactDOM.render(router, document.getElementById('app'))
