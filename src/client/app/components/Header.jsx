import React, { Component, PropTypes } from 'react'

import ButtonCreate from './ButtonCreate'
import ButtonSignIn from './ButtonSignIn'
import Logo from './Logo'
import SearchInput from './SearchInput'
import UserProfile from './UserProfile'

const Header = ({ showSearch, user, onCreate, onSearch }) =>
    <div style={s}>
        <div className="container">
            <Logo />

            {showSearch &&
            <SearchInput onEnterKey={onSearch} />}

            <div style={{float: 'right'}}>
                {user.login &&
                <ButtonCreate onClick={onCreate} />}

                {user.login ?
                    <UserProfile user={user} /> :
                    <ButtonSignIn />
                }
            </div>
        </div>
    </div>

const s = {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e5e5e5',
    height: 50,
    lineHeight: '30px',
    paddingTop: 10,
    paddingBottom: 10
}

export default Header