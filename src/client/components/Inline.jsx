import React, { Component, PropTypes } from 'react'

const Inline = ({ children, style }) => {
    return (
        <div style={Object.assign({}, style, s)}>
            {children}
        </div>
    )
}

const s = {
    display: 'inline-block',
    margin: 5
}

export default Inline