import React, { Component, PropTypes } from 'react'

const Avatar = ({ avatarURL }) => {
    return <img style={s} src={avatarURL} />
}

const s = {
    borderRadius: 3,
    display: 'inline-block',
    height: 32,
    verticalAlign: 'top',
    width: 32
}

export default Avatar