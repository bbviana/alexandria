import React, { Component, PropTypes } from 'react'

import { Button, Icon } from '../../components'

const ButtonRemove = ({ style, onClick }) => {
    return (
        <Button
            style={style}
            size="small"
            type="danger"
            onClick={confirmThenExecute(onClick)}>

            <Icon name="trash"/> Remover
        </Button>
    )
}


const confirmThenExecute = (action) => () => {
    if (confirm("Tem certeza de que deseja remover este Snippet?")) {
        action()
    }
}

export default ButtonRemove