import React, {Component, PropTypes} from 'react';

class Icon extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired
    }

    render = ({style, name} = this.props) =>
        <i style={style} className={"fa fa-" + name} />
}

export default Icon