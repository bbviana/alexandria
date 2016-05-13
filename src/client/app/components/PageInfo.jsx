import React, { Component, PropTypes } from 'react'

import Container from './Container'

const PageHeader = ({ children }) => {
    return (
        <div style={s}>
            <Container>
                {children}
            </Container>
        </div>
    )
}

const s = {
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #eee',
    marginBottom: 20,
    paddingTop: 20
}

export default PageHeader