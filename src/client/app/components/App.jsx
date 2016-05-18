import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import nav from '../../navigation'
import loggedUser from '../../loggedUser'
import message from '../../message'
const { Message } = message.components

import Header from './Header'


class App extends Component {

    componentDidMount() {
        // carrega usuário se ainda não o fez
        !this.props.user.login &&
        this.props.loadLoggedUser()
    }

    render() {
        const { message, hideHeaderSearch, user } = this.props
        const { gotoCreate, gotoSearch } = this.props

        return (
            <div style={s}>
                <Header
                    showSearch={!hideHeaderSearch}
                    user={user}
                    onCreate={gotoCreate}
                    onSearch={gotoSearch}
                />

                {message &&
                <Message message={message} />}

                {this.props.children}
            </div>
        )
    }
}

const s = {}

const mapStateToProps = (state) => ({
    message: state.message,
    user: state.loggedUser
})


const mapDispatchToProps = (dispatch) => ({
    loadLoggedUser(currentUser){
        dispatch(loggedUser.actions.load(currentUser))
    },

    gotoCreate(){
        dispatch(nav.actions.gotoCreate())
    },

    gotoSearch(query){
        dispatch(nav.actions.gotoSearch(query))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)