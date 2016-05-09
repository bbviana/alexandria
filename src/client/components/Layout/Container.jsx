import React, { Component, PropTypes } from 'react'

// ---

const s = {}

const Container = ({ children }) =>
    <div style={s.root} className="container">
        {children}
    </div>


s.root = {
    marginBottom: 20
}

export default Container