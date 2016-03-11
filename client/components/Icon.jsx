import React, {Component, PropTypes} from 'react';

class Icon extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
    }

    render = () =>
        <div className="ticon" style={this.style}>
            <i className={"ticon ticon-" + this.props.name} />
        </div>

    style = {
        display: 'inline-block',
        margin: 5
    }
}

export default Icon