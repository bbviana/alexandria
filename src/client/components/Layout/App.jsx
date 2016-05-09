import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from '~/client/actions'

import { handleEnterKey } from '~/utils/events'

import Button from '../commons/Button'
import Icon from '../commons/Icon'

import FlashMessage from './FlashMessage'

// ---

const s = {}

class App extends Component {

    componentDidMount() {
        this.props.loadUser()
    }

    render() {
        const { flashMessage, hideHeaderSearch, user } = this.props
        const { gotoCreate, gotoSearch } = this.props

        return (
            <div style={s.root}>
                <Header
                    showSearch={!hideHeaderSearch}
                    user={user}
                    onCreate={gotoCreate}
                    onSearch={gotoSearch}
                />

                {flashMessage &&
                <FlashMessage message={flashMessage}/>}

                {this.props.children}
            </div>
        )
    }
}


const Header = ({ showSearch, user, onCreate, onSearch }) =>
    <div style={s.header}>
        <div className="container">
            <Logo />

            {showSearch &&
            <SearchInput onEnterKey={onSearch}/>}

            <div style={{float: 'right'}}>
                {user.login &&
                <CreateButton onClick={onCreate}/>}

                {user.login ?
                    <UserProfile user={user}/> :
                    <SignInButton />
                }
            </div>
        </div>
    </div>

s.header = {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e5e5e5',
    height: 50,
    lineHeight: '30px',
    paddingTop: 10,
    paddingBottom: 10
}


const Logo = () =>
    <a style={s.logo} href="/">
        Alexandria
    </a>

s.logo = {
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'monospace',
    marginRight: 15,
    textDecoration: 'none',
    verticalAlign: 'middle'
}


const SearchInput = ({ onEnterKey }) =>
    <input
        style={s.searchInput}
        className="form-control"
        placeholder="Busca..."
        type="text"
        onKeyUp={(e) => handleEnterKey(e, onEnterKey(e.target.value))}
    />

s.searchInput = {
    display: 'inline-block',
    height: 30,
    verticalAlign: 'middle',
    width: 360
}


const CreateButton = ({ onClick }) =>
    <Button size="small" onClick={onClick}>
        Novo snippet
    </Button>


const SignInButton = () =>
    <a className="btn btn-danger" href="/auth/google">
        <Icon name="google-plus"/> Entrar
    </a>

s.signInButton = {
    backgroundColor: '#b33630',
    backgroundImage: 'linear-gradient(#dc5f59, #b33630)',
    borderColor: '#cd504a',
    color: '#fff'
}


class UserProfile extends Component {
    state = {
        dropdownOpen: false
    }

    componentDidMount = () => {
        document.addEventListener('click', ({ target }) => {
            !target.classList.contains('dropdown-toggle') && this.closeDropdown()
        })
    }

    toggleDropdown = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen})
    }

    closeDropdown = () => {
        this.state.dropdownOpen && this.setState({dropdownOpen: false})
    }


    render = () => {
        const { user } = this.props
        const { dropdownOpen } = this.state

        return (
            <div style={s.userProfile.root} className="btn-group">
                <button
                    style={s.userProfile.button}
                    className="dropdown-toggle"
                    onClick={this.toggleDropdown}
                >
                    <img style={s.userProfile.avatar} className="dropdown-toggle" src={user.avatarURL}/>
                    <span className="caret dropdown-toggle"/>
                </button>
                {dropdownOpen &&
                <ul style={s.userProfile.dropdown} className="dropdown-menu">
                    <li style={s.userProfile.loggedAs}>
                        Logado como <b>{user.login}</b>
                    </li>
                    <li className="divider"/>
                    <li><a href="#">Meus snippets</a></li>
                    <li><a href="#">Snippets favoritos</a></li>
                    <li className="divider"/>
                    <li><a href="/logout">Sair</a></li>
                </ul>}
            </div>
        )
    }
}

s.userProfile = {
    root: {
        display: 'inline-block',
        position: 'relative'
    },

    avatar: {
        borderRadius: 3,
        display: 'inline-block',
        height: 20,
        width: 20
    },

    button: {
        background: 'transparent',
        border: 'none',
        lineHeight: '20px',
        outline: 'none',
        padding: '4px 8px'
    },

    dropdown: {
        display: 'block',
        left: 'initial',
        marginTop: 10,
        right: 0
    },

    loggedAs: {
        padding: '3px 20px',
        whiteSpace: 'nowrap'
    }
}


// ---

const mapStateToProps = (state) => ({
    flashMessage: state.app.flashMessage,
    user: state.loggedUser
})


const mapDispatchToProps = (dispatch) => ({
    loadUser: () => {
        actions.loadUser(dispatch)
    },

    gotoCreate: actions.gotoCreate,

    gotoSearch: (query) => {
        actions.gotoSearch(query)
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)