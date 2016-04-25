import React, {Component, PropTypes} from 'react'

class Container extends Component {

    render = () =>
        <div style={s.root} className="container">
            {this.props.children}
        </div>
}

const s = {
    root: {
        marginBottom: 20
    }
}

export default Container