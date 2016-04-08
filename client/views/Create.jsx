import React, {Component, PropTypes} from 'react'
import {AppStore} from '../stores'
import {Button, Icon} from '../components'
import {App, Container, Description, Files, PageHeader} from './'
import {connect} from '../helpers'

class Create extends Component {

    render = ({description, files} = this.props) =>
        <App>
            <PageHeader />

            <Container>
                <Description value={description}/>

                <Files files={files} actions={saveButton}/>
            </Container>
        </App>
}


const saveButton = (
    <Button onClick={() => AppStore.create()}>
        Criar snippet
    </Button>
)


// Styles

const s = {
}

const mapStateToProps = state => ({
    description: state.description,
    files: state.files
})

export default connect(Create, AppStore, mapStateToProps)