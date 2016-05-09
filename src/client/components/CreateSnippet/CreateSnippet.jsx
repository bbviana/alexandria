import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from '~/client/actions'

import Button from '../commons/Button'
import Icon from '../commons/Icon'

import App from '../Layout/App'
import Container from '../Layout/Container'
import PageHeader from '../Layout/PageHeader'

import Files from '../Files'

import Description from '../Description'

// ---

const s = {};

class CreateSnippet extends Component {

    componentDidMount() {
        this.props.addEmptyFile()
    }

    render = () => {
        const { description, files, onChangeDescription, onSave } = this.props

        return (
            <App>
                <PageHeader />

                <Container>
                    <Description value={description} onChange={onChangeDescription}/>

                    <Files files={files} actions={saveButton(onSave)}/>
                </Container>
            </App>
        )
    }
}


const saveButton = (onClick) => (
    <Button onClick={onClick}>
        Criar snippet
    </Button>
);

// ---

const mapStateToProps = (state) => ({
    description: state.snippet.description,
    files: state.files
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    addEmptyFile: () => {
        dispatch(actions.addFile())
    },

    onSave: () => {
        actions.create({
            description: ownProps.description,
            files: ownProps.files
        })
    },

    onChangeDescription: (value) => {
        dispatch(actions.changeSnippet('description', value))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSnippet)