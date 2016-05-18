import React, { Component, PropTypes } from 'react'

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
            <div style={s.root} className="btn-group">
                <button
                    style={s.button}
                    className="dropdown-toggle"
                    onClick={this.toggleDropdown}
                >
                    <img style={s.avatar} className="dropdown-toggle" src={user.avatarURL}/>
                    <span className="caret dropdown-toggle"/>
                </button>
                {dropdownOpen &&
                <ul style={s.dropdown} className="dropdown-menu">
                    <li style={s.loggedAs}>
                        Logado como <b>{user.login}</b>
                    </li>
                    <li className="divider"/>
                    <li><a href={'/' + user.login}>Meus snippets</a></li>
                    <li><a href={'/' + user.login + '/starred'}>Snippets favoritos</a></li>
                    <li className="divider"/>
                    <li><a href="/logout">Sair</a></li>
                </ul>}
            </div>
        )
    }
}

const s = {
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

export default UserProfile