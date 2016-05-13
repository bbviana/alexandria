import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions'
import nav from '../../navigation'

import app from '../../app'
const { App, Container, PageInfo } = app.components

import files from '../../files'
const { FileDetails } = files.components

import Description from './Description'
import Info from './Info'
import ButtonEdit from './ButtonEdit'
import ButtonRemove from './ButtonRemove'

class DetailsPage extends Component {
    componentDidMount = () => {
        this.props.load(this.props.params.id)
    }

    render = () => {
        const { _id, created, description, files, updated, user } = this.props
        const { edit, remove } = this.props

        return (
            <App>
                <PageInfo>
                    <Info
                        created={created}
                        fileName={files[0] && files[0].name}
                        snippetId={_id}
                        updated={updated}
                        user={user}
                    />

                    <div style={s.actions}>
                        <ButtonEdit onClick={() => edit(_id)} />
                        <ButtonRemove onClick={() => remove(_id)} />
                    </div>
                </PageInfo>

                <Container>
                    <Description readOnly value={description} />

                    {files.map((file, i) =>
                        <FileDetails file={file} key={i} />
                    )}
                </Container>
            </App>
        )
    }
}

const s = {
    actions: {
        float: 'right'
    }
}

const mapStateToProps = (state) => {
    const { snippet } = state
    return {
        _id: snippet._id,
        created: snippet.created,
        description: snippet.description,
        updated: snippet.updated,
        user: snippet.user,
        files: state.files
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        edit: (snippetId) => {
            dispatch(nav.actions.gotoEdit(snippetId))
        },

        load: (snippetId) => {
            dispatch(actions.load(snippetId))
        },

        remove: (snippetId) => {
            dispatch(actions.remove(snippetId))
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsPage)