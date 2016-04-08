import React from 'react'
import ReactDOM from 'react-dom'
import {App, Create, Edit, Search, View} from '.'
import {IndexRoute, Router, Route, browserHistory} from 'react-router'

const router = (
    <Router history={browserHistory}>
        <Route path="/" component={Create}/>
        <Route path="create" component={Create}/>
        <Route path="view/:id" component={View}/>
        <Route path="search" component={Search}/>
        <Route path="edit/:id" component={Edit}/>
    </Router>
)

ReactDOM.render(router, document.getElementById('app'))
