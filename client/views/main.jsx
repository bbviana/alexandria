import React from 'react'
import ReactDOM from 'react-dom'
import {App, Create, Search, View} from '.'
import {IndexRoute, Link, Router, Route, browserHistory, hashHistory} from 'react-router'

// FIXME usar browserHistory https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#browserhistory

const router = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Create} />
            <Route path="create" component={Create}/>
            <Route path="view/:id" component={View}/>
            <Route path="search" component={Search}/>
        </Route>
    </Router>
)

ReactDOM.render(router, document.getElementById('app'))
