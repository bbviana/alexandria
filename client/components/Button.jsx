import React, {Component, PropTypes} from 'react'
import {m, styles} from '../helpers'

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
        {style, disabled, onClick, title, type} = this.props) => {

        let ownStyle = styles(s, {active, hover, disabled, small: type === 'small'})

        return(
            <button
                style={m(ownStyle, style)}
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
        )
    }
}

const s = {
    backgroundColor: '#eee',
    backgroundImage: 'linear-gradient(#fcfcfc, #eee)',
    border: '1px solid #d5d5d5',
    borderRadius: 3,
    color: '#333',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: '20px',
    outline: 'none',
    padding: '6px 12px',
    verticalAlign: 'middle',

    small: {
        padding: '2px 10px'
    },

    active: {
        backgroundColor: '#dcdcdc',
        backgroundImage: 'none',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
    },

    hover: {
        backgroundColor: '#ddd',
        backgroundImage: 'linear-gradient(#eee, #ddd)'
    },

    disabled: {
        cursor: 'not-allowed',
        opacity: .65
    }
}

export default Button