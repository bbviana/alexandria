import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions'

import { Icon } from '../../components'

class Message extends Component {

    render() {
        const { message } = this.props
        const { onClear } = this.props

        return (
            <div style={s.root}>
                <div className="container">
                    {message}

                    <button style={s.closeButton} onClick={onClear}>
                        <Icon name="times"/>
                    </button>
                </div>
            </div>
        )
    }
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


const mapStateToProps = ({ message }) => ({
    message
})

const mapDispatchToProps = (dispatch) => ({
    onClear: () => {
        dispatch(actions.clear())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message)