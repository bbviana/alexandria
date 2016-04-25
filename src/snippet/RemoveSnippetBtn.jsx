//region Imports
import React, {Component, PropTypes} from 'react'

import AppStore from '~/app/AppStore'

import Button from '~/app/components/Button'
import Icon from '~/app/components/Icon'
//endregion

class RemoveSnippetBtn extends Component {

    handleClick = ({id} = this.props) => {
        if (confirm("Tem certeza de que deseja remover este Snippet?")) {
            AppStore.remove(id)
        }
    }

    render = ({style} = this.props) =>
        <Button
            style={style}
            size="small"
            type="danger"
            onClick={this.handleClick}>
            <Icon name="trash"/> Remover
        </Button>
}

const s = {
    root: {}
}

export default RemoveSnippetBtn