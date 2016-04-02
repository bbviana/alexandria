import React, {Component, PropTypes} from 'react'


const connect = function (ComposedComponent, store, mapStateToProps) {
    class Connected extends Component {
        constructor() {
            super()
            this.state = store.state
        }

        componentDidMount = () => store.listen(this)

        componentWillUnmount = () => store.unlisten(this)

        render = () => {
            let props = this.state

            if (mapStateToProps) {
                props = mapStateToProps(this.state)
            }

            return (
                <ComposedComponent {...this.props} {...props}/>
            )
        }
    }

    return Connected
}

export default connect