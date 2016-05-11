import React, { Component, PropTypes } from 'react'

import Button from './commons/Button'
import Icon from './commons/Icon'

// ---

const s = {}

const RemoveSnippetButton = ({ style, onClick }) =>
    <Button
        style={style}
        size="small"
        type="danger"
        onClick={confirmBeforeExecute(onClick)}>

        <Icon name="trash"/> Remover
    </Button>


const confirmBeforeExecute = (action) => () => {
    confirm("Tem certeza de que deseja remover este Snippet?") && action()
}


export default RemoveSnippetButton