import React, {Component, PropTypes} from 'react'
import {styles} from '../helpers'

class Button extends Component {
    state = {
        active: false,
        hover: false
    }

    handleBlur = () => this.setState({hover: false})
    handleFocus = () => this.setState({hover: true})
    handleMouseDown = () => this.setState({active: true})
    handleMouseOut = () => this.setState({active: false, hover: false})
    handleMouseOver = () => this.setState({hover: true})
    handleMouseUp = () => this.setState({active: false})

    render = ({active, hover} = this.state,
        {disabled, onClick, title} = this.props) =>
        <button
            style={styles(s, {active, hover, disabled})}
            disabled={disabled}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onMouseDown={this.handleMouseDown}
            onMouseOut={this.handleMouseOut}
            onMouseOver={this.handleMouseOver}
            onMouseUp={this.handleMouseUp}
            onClick={onClick}
            title={title}>
            {this.props.children}
        </button>
}

const s = {
    background: '#fff',
    border: '1px solid transparent',
    borderColor: '#cdd3d7',
    color: '#616f77',
    cursor: 'pointer',
    fontSize: 14,
    outline: 0,
    padding: '10px 12px',
    verticalAlign: 'middle',

    active: {
        backgroundColor: '#eaeced',
        boxShadow: 'inset 0 3px 5px rgba(0,0,0,.125)'
    },

    hover: {
        background: '#f2f3f4'
    },

    disabled: {
        cursor: 'not-allowed',
        opacity: .65
    }
}

export default Button