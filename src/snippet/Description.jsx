import React, {Component, PropTypes} from 'react'
import snippetActions from '~/app/actions/snippetActions'

class Description extends Component {

    render = ({value} = this.props) =>
        <input
            style={s.root}
            className="form-control input-contrast"
            autoFocus
            placeholder="Descrição do snippet..."
            type="text"
            value={value}
            onChange={e => snippetActions.changeDescription(e.target.value)}
        />
}

const s = {
    root: {}
}

export default Description