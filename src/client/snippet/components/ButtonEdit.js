import React, { Component, PropTypes } from 'react'

import { Button, Icon } from '../../components'

const ButtonEdit = ({ onCLick }) => {
    return (
        <Button size="small" onClick={onCLick}>
            <Icon name="pencil" /> Editar
        </Button>
    )
}

export default ButtonEdit