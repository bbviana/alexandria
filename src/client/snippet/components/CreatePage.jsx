import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions'

import { Button } from '../../components'

import app from '../../app'
const { App, Container, PageInfo } = app.components

import files from '../../files'
const { FileListEditor } = files.components

import Description from './Description'


class CreatePage extends Component {

    render = () => {
        const { description, files } = this.props
        const { change, save } = this.props

        return (
            <App>
                <PageInfo />

                <Container>
                    <Description
                        value={description}
                        onChange={(description) => change({description})}
                    />

                    <FileListEditor files={files}>
                        <SaveButton onClick={() => save({description, files})}/>
                    </FileListEditor>
                </Container>
            </App>
        )
    }
}


const SaveButton = ({onClick}) => (
    <Button onClick={onClick}>
        Criar snippet
    </Button>
)


const mapStateToProps = (state) => ({
    description: state.snippet.description,
    files: state.files
})

const mapDispatchToProps = (dispatch) => ({
    change: (newValues) => {
        dispatch(actions.change(newValues))
    },

    save: (snippet) => {
        dispatch(actions.create(snippet))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePage)