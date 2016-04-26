//region Imports
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

import AppStore from '~/app/AppStore'

import Button from '~/app/components/Button'

import Events from '~/app/helpers/Events'
import connect from '~/app/helpers/connect'

import FlashMessage from './FlashMessage'
//endregion

class App extends Component {

    render = ({flashMessage} = this.props) => {
        const {hideHeaderSearch} = this.props

        return (
            <div style={s.root}>
                <Header hideSearch={hideHeaderSearch}/>
                {flashMessage &&
                <FlashMessage message={flashMessage}/>}

                {this.props.children}
            </div>
        )
    }
}

const Header = ({hideSearch}) =>
    <div style={s.header}>
        <div className="container">
            <Logo />
            {!hideSearch && <SearchInput />}
            <div style={{float: 'right'}}>
                <CreateBtn />
                <UserProfile />
            </div>
        </div>
    </div>


const Logo = () =>
    <a style={s.logo} href="/">Alexandria</a>


const SearchInput = () =>
    <input
        style={s.searchInput}
        className="form-control"
        placeholder="Busca..."
        type="text"
        onKeyUp={e => Events.handleEnterKey(e, () => AppStore.gotoSearch(e.target.value))}
    />


const CreateBtn = () =>
    <div style={s.createBtn}>
        <Button size="small" onClick={() => AppStore.gotoCreate()}>Novo snippet</Button>
    </div>


class UserProfile extends Component {

    state = {
        dropdownOpen: false
    }

    componentDidMount = () =>
        document.addEventListener('click', ({target}) => {
            if (!target.classList.contains('dropdown-toggle')) {
                this.closeDropdown()
            }
        })

    toggleDropdown = () =>
        this.setState({dropdownOpen: !this.state.dropdownOpen})

    closeDropdown = () =>
    this.state.dropdownOpen && this.setState({dropdownOpen: false})


    render = ({dropdownOpen} = this.state) =>
        <div style={s.userProfile} className="btn-group">
            <button style={s.userProfileButton} className="dropdown-toggle" onClick={this.toggleDropdown}>
                <img style={s.avatar} className="dropdown-toggle"
                     src="https://avatars3.githubusercontent.com/u/1538307?v=3&s=52"/>
                <span className="caret dropdown-toggle"/>
            </button>
            {dropdownOpen &&
            <ul style={s.userProfileDropdown} className="dropdown-menu">
                <li><a href="#">Logado como <b>bbviana</b></a></li>
                <li className="divider"/>
                <li><a href="#">Meus snippets</a></li>
                <li><a href="#">Snippets favoritos</a></li>
                <li className="divider"/>
                <li><a href="#">Sair</a></li>
            </ul>}
        </div>
}


// styles

const s = {
    root: {},

    avatar: {
        borderRadius: 3,
        display: 'inline-block',
        height: 20,
        width: 20
    },

    createBtn: {
        display: 'inline-block'
    },

    header: {
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e5e5e5',
        height: 50,
        lineHeight: '30px',
        paddingTop: 10,
        paddingBottom: 10
    },

    logo: {
        display: 'inline-block',
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily: 'monospace',
        marginRight: 15,
        textDecoration: 'none',
        verticalAlign: 'middle'
    },

    searchInput: {
        display: 'inline-block',
        height: 30,
        verticalAlign: 'middle',
        width: 360
    },

    userProfile: {
        display: 'inline-block',
        position: 'relative'
    },

    userProfileButton: {
        background: 'transparent',
        border: 'none',
        lineHeight: '20px',
        outline: 'none',
        padding: '4px 8px'
    },

    userProfileDropdown: {
        display: 'block',
        left: 'initial',
        marginTop: 10,
        right: 0
    }
}


const mapStateToProps = state => ({
    flashMessage: state.flashMessage
})

export default connect(App, AppStore, mapStateToProps)
