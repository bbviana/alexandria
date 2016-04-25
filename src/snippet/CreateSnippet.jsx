//region Imports
import React, {Component, PropTypes} from 'react'

import AppStore from '~/app/AppStore'

import Button from '~/app/components/Button'
import Icon from '~/app/components/Icon'

import connect from '~/app/helpers/connect'

import App from '~/app/layouts/App'
import Container from '~/app/layouts/Container'
import PageHeader from '~/app/layouts/PageHeader'

import Files from '~/file/Files'

import Description from './Description'
//endregion

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