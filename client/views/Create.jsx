import React, {Component, PropTypes} from 'react'
import {AppStore} from '../stores'
import {Button, Icon} from '../components'
import {Container, Description, Files, PageHeader} from './'
import {connect} from '../helpers'

class Create extends Component {

    render = ({description, files} = this.props) =>
        <div style={s.root}>
            <PageHeader />

            <Container>
                <Description value={description}/>

                <Files files={files} actions={saveButton}/>
            </Container>
        </div>
}


const saveButton = (
    <Button onClick={() => AppStore.save()}>
        Criar snippet
    </Button>
)


// Styles

const s = {
    root: {}
}

const mapStateToProps = state => ({
    description: state.description,
    files: state.files
})

export default connect(Create, AppStore, mapStateToProps)