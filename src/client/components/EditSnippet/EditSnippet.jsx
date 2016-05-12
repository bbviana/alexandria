import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import Button from '../commons/Button'
import Icon from '../commons/Icon'

import App from '../Layout/App'
import Container from '../Layout/Container'
import PageHeader from '../Layout/PageHeader'

import Description from '../Description'
import Files from '../Files'
import RemoveSnippetButton from '../RemoveSnippetButton'

// ---

const s = {}

class EditSnippet extends Component {
    componentDidMount = () => {
        this.props.loadSnippet(this.props.params.id)
    }

    render = () => {
        const {_id, description, files} = this.props
        const {onCancel, onRemove, onSave} = this.props

        return (
            <App>
                <PageHeader>
                    <Icon style={s.edit.codeIcon} name="file-code-o"/>

                    <span style={s.edit.title}>
                        Editando <a href={"/view/" + _id}>{files[0].name}</a>
                    </span>

                    <RemoveSnippetButton
                        style={s.edit.removeButton}
                        onClick={() => onRemove(_id)}
                    />
                </PageHeader>

                <Container>
                    <Description value={description}/>

                    <Files
                        files={files}
                        actions={toolbar(
                            () => onCancel(_id),
                            () => onSave({_id, description, files})
                        )}
                    />

                </Container>
            </App>
        )
    }
}

s.edit = {
    codeIcon: {
        color: '#bbb',
        fontSize: 28,
        marginRight: 10,
        verticalAlign: 'middle'
    },

    title: {
        color: '#666',
        fontSize: 20,
        fontWeight: 'bold',
        verticalAlign: 'middle'
    },

    removeButton: {
        float: 'right'
    }
}


const toolbar = (onCancel, onSave) =>
    <div>
        <Button
            style={{marginRight: 10}}
            type="danger"
            onClick={onCancel}
        >
            Cancelar Edição
        </Button>

        <Button
            type="primary"
            onClick={onSave}
        >
            Salvar alterações
        </Button>
    </div>


// ---

const mapStateToProps = (state) => {
    const {snippet} = state
    return {
        _id: snippet._id,
        description: snippet.description,
        files: state.files
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSnippet: (snippetId) => {
            dispatch(actions.api.load(snippetId))
        },

        onCancel: (snippetId) => {
            dispatch(actions.nav.gotoView(snippetId))
        },

        onRemove: (snippetId) => {
            dispatch(actions.api.remove(snippetId))
        },

        onSave: (snippet) => {
            dispatch(actions.api.save(snippet))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditSnippet)