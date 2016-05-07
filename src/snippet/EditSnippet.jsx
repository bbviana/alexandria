//region Imports
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { gotoView, load, save, remove } from '~/app/actions'

import Button from '~/app/components/Button'
import Icon from '~/app/components/Icon'

import App from '~/app/layouts/App'
import Container from '~/app/layouts/Container'
import PageHeader from '~/app/layouts/PageHeader'

import Files from '~/file/Files'

import Description from './Description'
import RemoveSnippetButton from './RemoveSnippetButton'
//endregion

const s = {}

class EditSnippet extends Component {
    componentDidMount = () => {
        load(this.props.params.id)
    }

    render = () => {
        const {id, description, files, onCancel, onRemove, onSave} = this.props

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
                        actions={actions(onCancel, onSave)}
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


const actions = (onCancel, onSave) =>
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
    onCancel: () => gotoView(ownProps.id),
    onRemove: () => remove(ownProps.id),
    onSave: save
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditSnippet)