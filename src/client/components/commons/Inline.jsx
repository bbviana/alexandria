import React, {Component, PropTypes} from 'react';
const merge = Object.assign

class Inline extends Component {
    render = () =>
        <div style={merge({}, this.props.style, this.style)}>
            {this.props.children}
        </div>

    style = {
        display: 'inline-block',
        margin: 5
    }
}

export default Inline