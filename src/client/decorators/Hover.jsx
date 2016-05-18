import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

/**
 * High order function que passa para o Component uma prop hover: true se ele recebeu
 * evento de mouseover; hover: false, se recebeu mouseout.
 */
const Hover = (WrappedComponent) => {
    return class extends Component {
        state = {
            hover: false
        }

        componentDidMount() {
            const node = ReactDOM.findDOMNode(this)
            node.addEventListener('mouseout', this.handleMouseOut)
            node.addEventListener('mouseover', this.handleMouseOver)
        }


        handleMouseOut = () => {
            this.setState({hover: false})
        }

        handleMouseOver = () => {
            this.setState({hover: true})
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    hover={this.state.hover}
                />
            )
        }
    }
}

export default Hover