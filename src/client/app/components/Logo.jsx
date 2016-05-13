import React, { Component, PropTypes } from 'react'

const Logo = () => {
    return (
        <a style={s} href="/">
            Alexandria
        </a>
    )
}

const s = {
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'monospace',
    marginRight: 15,
    textDecoration: 'none',
    verticalAlign: 'middle'
}

export default Logo