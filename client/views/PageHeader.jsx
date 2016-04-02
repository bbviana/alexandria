import React, {Component, PropTypes} from 'react'
import {Container} from './'

class PageHeader extends Component {

    render = () =>
        <div style={s.root}>
            <Container>
                {this.props.children}
            </Container>
        </div>
}

const s = {
    root: {
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #eee',
        marginBottom: 20,
        paddingTop: 20
    }
}

export default PageHeader