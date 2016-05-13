import React, { Component, PropTypes } from 'react'

import { Button, Icon } from '../../components'

const Toolbar = ({ children, addFile }) => {
    return (
        <div style={s.root}>
            <Button onClick={addFile}>
                <Icon name="plus-square"/> Adicionar arquivo
            </Button>

            {/* actions */}
            <div style={s.right}>
                {children}
            </div>
        </div>
    )
}

const s = {
    root: {
        marginTop: 20
    },

    right: {
        float: 'right'
    }
}

export default Toolbar
