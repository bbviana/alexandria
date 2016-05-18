import React, {Component, PropTypes} from 'react'

const ProfileAvatar = ({ user }) => {
    return (
        <div style={s.root}>
            <img style={s.avatar} src={user.avatarURL} alt={user.login} />
            <div style={s.name}>{user.name}</div>
            <div style={s.login}>{user.login}</div>
        </div>
    )
}


const s = {
    root: {
        color: '#666',
        paddingLeft: 52,
        position: 'relative'
    },

    avatar: {
        height: 43,
        left: 0,
        position: 'absolute',
        top: 0,
        width: 42
    },

    login: {
        color: '#aaa',
        fontSize: 18,
        lineHeight: '20px'
    },

    name: {
        fontSize: 24,
        lineHeight: '24px'
    }
}

export default ProfileAvatar