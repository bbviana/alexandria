import React, {Component, PropTypes} from 'react'
import {ViewStore} from '../stores'

class View extends Component {
    state = ViewStore.state

    componentDidMount = () => {
        ViewStore.listen(this)
        ViewStore.load(this.props.params.id)
    }

    componentWillUnmount = () => ViewStore.unlisten(this)

    render = ({description} = this.state) =>
        <div style={s.root}>
            {description}
        </div>
}

const s = {
    root: {}
}

export default View