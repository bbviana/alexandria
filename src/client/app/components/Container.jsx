import React, { Component, PropTypes } from 'react'

const Container = ({children}) =>
    <div style={s} className="container">
        {children}
    </div>


const s = {
    marginBottom: 20
}

export default Container