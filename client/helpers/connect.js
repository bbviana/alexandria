import React, {Component, PropTypes} from 'react'


const connect = function(ComposedComponent, store){
    class Connected extends Component {
        constructor(){
            super()
            this.state = store.state
            store.listen(this)
        }

        render = () => <ComposedComponent {...this.props} {...this.state}/>
    }

    return Connected
}

export default connect