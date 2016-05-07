//region Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IndexRoute, Route, Router, browserHistory } from 'react-router'

import App from '~/app/layouts/App'
import configureStore from '~/app/store/configureStore'

import CreateSnippet from '~/snippet/CreateSnippet'
//import EditSnippet from '~/snippet/EditSnippet'
//import SearchSnippet from '~/snippet/SearchSnippet'
//import UserSnippets from '~/snippet/UserSnippets'
//import ViewSnippet from '~/snippet/ViewSnippet'
//endregion

const store = configureStore()

const router = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={CreateSnippet}/>
            <Route path="create" component={CreateSnippet}/>


        </Router>
    </Provider>
)

//<Route path="view/:id" component={ViewSnippet}/>
//<Route path="search" component={SearchSnippet}/>
//<Route path="edit/:id" component={EditSnippet}/>
//<Route path=":user" component={UserSnippets}/>

ReactDOM.render(router, document.getElementById('app'))
