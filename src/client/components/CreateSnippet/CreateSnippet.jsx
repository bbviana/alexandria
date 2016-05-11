import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'

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

    render = () => {
        const {description, files} = this.props
        const {onChangeDescription, onSave} = this.props

        return (
            <App>
                <PageHeader />

                <Container>
                    <Description
                        value={description}
                        onChange={onChangeDescription}
                    />

                    <Files
                        files={files}
                        actions={saveButton(() => onSave( {description, files} ))}
                    />
                </Container>
            </App>
        )
    }
}


const saveButton = (onClick) => (
    <Button onClick={onClick}>
        Criar snippet
    </Button>
)

// ---

const mapStateToProps = (state) => ({
    description: state.snippet.description,
    files: state.files
})

const mapDispatchToProps = (dispatch) => ({
    addEmptyFile: () => {
        dispatch(actions.app.addFile())
    },

    clearSnippet: () => {
        dispatch(actions.app.clearSnippet())
    },

    onSave: (snippet) => {
        dispatch(actions.api.create(snippet))
    },

    onChangeDescription: (value) => {
        dispatch(actions.app.changeSnippet('description', value))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSnippet)