import React, {Component, PropTypes} from 'react'

class Columns extends Component {

    render = ({sizes} = this.props) =>
        <div style={s.root} className="row">
            {React.Children.map(this.props.children, (child, i) =>
                <div className={"col-md-" + sizes[i]}>
                    {child}
                </div>
            )}
        </div>
}

const s = {
    root: {}
}

export default Columns