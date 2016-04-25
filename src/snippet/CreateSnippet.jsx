import React, {Component, PropTypes} from 'react'
import {connect} from '../app/helpers'
import AppStore from '../app/AppStore'
import {App, Container, PageHeader} from '../app/layouts'
import {Button, Icon} from '../app/components'
import {Description} from './'
import Files from '../file/Files'

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