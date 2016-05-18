import React, { Component, PropTypes } from 'react'

import { Button, Icon } from '../../components'

const ButtonEdit = ({ onClick }) => {
    return (
        <Button size="small" onClick={onClick}>
            <Icon name="pencil" /> Editar
        </Button>
    )
}

ButtonEdit.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ButtonEdit