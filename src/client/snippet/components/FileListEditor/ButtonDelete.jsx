import React, { Component, PropTypes } from 'react'

import { Button, Icon } from '../../../components'

const ButtonDelete = ({ onClick }) => {
    return (
        <span className="input-group-btn">
            <Button
                style={s}
                type="danger"
                onClick={onClick}>

                <Icon name="trash"/>
            </Button>
        </span>
    )
}

const s = {
    borderBottomLeftRadius: 0,
    borderLeft: 0,
    borderTopLeftRadius: 0
}

export default ButtonDelete
