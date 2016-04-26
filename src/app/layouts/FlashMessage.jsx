import React, {Component, PropTypes} from 'react'

import AppStore from '~/app/AppStore'
import Icon from '~/app/components/Icon'

class FlashMessage extends Component {

    render = ({message} = this.props) =>
        <div style={s.root}>
            <div className="container">
                {message}

                <button style={s.closeButton} onClick={() => AppStore.clearMessage()}>
                    <Icon name="times" />
                </button>
            </div>
        </div>
}

const s = {
    root: {
        backgroundColor: '#e2eef9',
        border: '1px solid #bac6d3',
        borderWidth: '1px 0',
        color: '#246',
        fontSize: 14,
        lineHeight: '1.5',
        marginTop: -1,
        padding: 15,
        position: 'relative'
    },

    closeButton: {
        background: 'none',
        border: 0,
        float: 'right',
        opacity: 0.6,
        outline: 'none'
    }
}

export default FlashMessage