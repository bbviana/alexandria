import React, {Component, PropTypes} from 'react'
import {AppStore} from '../stores'

class Description extends Component {

    render = ({value} = this.props) =>
        <input
            style={s.root}
            className="form-control input-contrast"
            autoFocus
            placeholder="Descrição do snippet..."
            type="text"
            value={value}
            onChange={e => AppStore.changeDescription(e.target.value)}
        />
}

const s = {
    root: {}
}

export default Description