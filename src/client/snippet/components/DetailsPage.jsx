import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions'
import nav from '../../navigation'

import app from '../../app'
const { App, Container, PageInfo } = app.components

import Description from './Description'
import ButtonEdit from './ButtonEdit'
import ButtonRemove from './ButtonRemove'
import ButtonStar from './ButtonStar'
import FileDetails from './FileDetails'
import Info from './Info'

class DetailsPage extends Component {
    componentDidMount() {
        this.props.load(this.props.params.id)
    }

    render() {
        const { _id, created, description, files, updated, user } = this.props
        const { edit, remove, star } = this.props

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
                        <ButtonStar onClick={() => star(_id)} />
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

const mapStateToProps = ({ snippet }) => {
    return {
        _id: snippet._id,
        created: snippet.created,
        description: snippet.description,
        files: snippet.files,
        updated: snippet.updated,
        user: snippet.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        edit(snippetId) {
            dispatch(nav.actions.gotoEdit(snippetId))
        },

        load(snippetId) {
            dispatch(actions.load(snippetId))
        },

        remove(snippetId) {
            dispatch(actions.remove(snippetId))
        },

        star(snippetId) {
            dispatch(actions.star(snippetId))
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsPage)