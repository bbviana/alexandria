import React, {Component, PropTypes} from 'react'

import m from '~/app/helpers/m'
import styles from '~/app/helpers/styles'

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
        {style, className, disabled, onClick, size, title, type} = this.props) => {

        let ownStyle = m({}, s.default, s[type])

        ownStyle = styles(ownStyle, {active, hover, disabled, small: size === 'small'})

        return (
            <button
                style={m(ownStyle, style)}
                className={className}
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
    default: {
        backgroundColor: '#eee',
        backgroundImage: 'linear-gradient(#fcfcfc, #eee)',
        border: '1px solid #d5d5d5',
        borderRadius: 3,
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: '20px',
        outline: 'none',
        padding: '6px 12px',
        verticalAlign: 'middle',

        small: {
            fontSize: 13,
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
    },

    primary: {
        backgroundColor: '#60b044',
        backgroundImage: 'linear-gradient(#8add6d, #60b044)',
        borderColor: '#5ca941',
        color: '#fff',
        textShadow: '0 -1px 0 rgba(0,0,0,0.15)',

        hover: {
            backgroundColor: '#569e3d',
            backgroundImage: 'linear-gradient(#79d858, #569e3d)',
            borderColor: '#4a993e',
            color: '#fff'
        }
    },

    danger: {
        color: '#900',

        hover: {
            backgroundColor: '#b33630',
            backgroundImage: 'linear-gradient(#dc5f59, #b33630)',
            borderColor: '#cd504a',
            color: '#fff'
        }
    }
}

export default Button