import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import * as actions from '../actions'
import nav from '../../navigation'

import { Button, Icon } from '../../components'

import app from '../../app'
const { App, Container, PageInfo } = app.components

import ButtonRemove from './ButtonRemove'
import Description from './Description'
import FileListEditor from './FileListEditor'


class EditPage extends Component {
    componentDidMount() {
        this.props.load(this.props.params.id)
    }

    render() {
        const { _id, description, files } = this.props
        const { cancel, change, remove, save } = this.props

        return (
            <App>
                <PageInfo>
                    <Icon style={s.codeIcon} name="file-code-o" />

                    <span style={s.title}>
                        Editando <a href={"/details/" + _id}>{files[0].name}</a>
                    </span>

                    <ButtonRemove
                        style={s.buttonRemove}
                        onClick={() => remove(_id)}
                    />
                </PageInfo>

                <Container>
                    <Description
                        value={description}
                        onChange={(description) => change({description})}
                    />

                    <FileListEditor files={files}>
                        <Button
                            style={{marginRight: 10}}
                            type="danger"
                            onClick={() => cancel(_id)}
                        >
                            Cancelar Edição
                        </Button>

                        <Button
                            type="primary"
                            onClick={() => save({_id, description, files})}
                        >
                            Salvar alterações
                        </Button>
                    </FileListEditor>
                </Container>
            </App>
        )
    }
}


const s = {
    buttonRemove: {
        float: 'right'
    },

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
    }
}

const mapStateToProps = ({ snippet }) => {
    return {
        _id: snippet._id,
        description: snippet.description,
        files: snippet.files
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancel(snippetId) {
            dispatch(nav.actions.gotoDetails(snippetId))
        },

        change(newValues) {
            dispatch(actions.change(newValues))
        },

        load(snippetId) {
            dispatch(actions.load(snippetId))
        },

        remove(snippetId) {
            dispatch(actions.remove(snippetId))
        },

        save(snippet){
            dispatch(actions.save(snippet))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPage)