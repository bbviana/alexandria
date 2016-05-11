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
        load(this.props.params.id)
    }

    render = () => {
        const {id, description, files} = this.props
        const {onCancel, onRemove, onSave} = this.props

        return (
            <App>
                <PageHeader>
                    <Icon style={s.edit.codeIcon} name="file-code-o"/>

                    <span style={s.edit.title}>
                        Editando <a href={"/view/" + id}>{files[0].name}</a>
                    </span>

                    <RemoveSnippetButton
                        style={s.edit.removeButton}
                        onClick={onRemove}
                    />
                </PageHeader>

                <Container>
                    <Description value={description}/>

                    <Files
                        files={files}
                        actions={toolbar(onCancel, onSave)}
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
        <Button style={{marginRight: 10}} type="danger" onClick={onCancel}>
            Cancelar Edição
        </Button>
        <Button type="primary" onClick={onSave}>
            Salvar alterações
        </Button>
    </div>


// ---

const mapStateToProps = (state) => ({
    id: state.snippet._id,
    description: state.snippet.description,
    files: state.files
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onCancel: () => actions.gotoView(ownProps.id),
    onRemove: () => actions.remove(ownProps.id),
    onSave: actions.save
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditSnippet)