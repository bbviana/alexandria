import React, { Component, PropTypes } from 'react'
import Container from './Container'

const s = {}

const PageHeader = ({ children }) =>
    <div style={s.root}>
        <Container>
            {children}
        </Container>
    </div>


s.root = {
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #eee',
    marginBottom: 20,
    paddingTop: 20
}

export default PageHeader