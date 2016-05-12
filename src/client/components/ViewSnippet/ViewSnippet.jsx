import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import actions from '../../actions'

import Button from '../commons/Button'
import CodeEditor from '../commons/CodeEditor'
import Icon from '../commons/Icon'
import MarkdownViewer from '../commons/MarkdownViewer'

import App from '../Layout/App'
import Container from '../Layout/Container'
import PageHeader from '../Layout/PageHeader'

import Info from '../Info'
import RemoveSnippetButton from '../RemoveSnippetButton'

//---

const s = {}


class ViewSnippet extends Component {
    componentDidMount = () => {
        this.props.loadSnippet(this.props.params.id)
    }

    render = () => {
        const {_id, created, description, files, updated, user} = this.props
        const {onRemove, gotoEdit} = this.props

        return (
            <App>
                <PageHeader>
                    <Info
                        created={created}
                        file={files[0] && files[0].name}
                        snippetId={_id}
                        updated={updated}
                        user={user}
                    />
                    <Actions
                        onRemove={() => onRemove(_id)}
                        gotoEdit={() => gotoEdit(_id)}
                    />
                </PageHeader>

                <Container>
                    <Description value={description}/>

                    {files.map((file, i) =>
                        <div key={i}>
                            <File file={file}/>
                        </div>
                    )}
                </Container>
            </App>
        )
    }
}


const Actions = ({onRemove, gotoEdit}) =>
    <div style={s.actions}>
        <EditButton onCLick={gotoEdit}/>
        <RemoveSnippetButton onClick={onRemove}/>
    </div>

s.actions = {
    float: 'right'
}


const EditButton = ({onCLick}) =>
    <Button size="small" onClick={onCLick}>
        <Icon name="pencil"/> Editar
    </Button>


const Description = ({value}) =>
    <div style={s.description}>{value}</div>

s.description = {
    marginBottom: 20,
    fontSize: 20,
    color: '#666'
}


const File = ({file}) =>
    <div style={s.file.root} id={'ANCHOR'}>
        <FileHeader value={file.name}/>

        {file.type === "md" ?
            <MarkdownViewer code={file.content}/> :
            <CodeEditor
                displayIndentGuides={false}
                maxLines={99999}
                mode={file.type}
                highlightActiveLine={false}
                highlightGutterLine={false}
                readOnly={true}
                showFoldWidgets={false}
                value={file.content}
            />
        }

    </div>


const FileHeader = ({value}) =>
    <div style={s.file.header}>
        <Icon name="file-code-o"/>
        <a style={s.file.name} href="#ANCHOR" title="Link Permanente">
            {value}
        </a>
    </div>

s.file = {
    root: {
        marginTop: 20,
        marginBottom: 15,
        border: '1px solid #ddd',
        borderRadius: 3
    },

    header: {
        backgroundColor: '#f7f7f7',
        borderBottom: '1px solid #d8d8d8',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        fontSize: 14,
        fontFamily: 'monospace',
        height: 45,
        lineHeight: '35px',
        padding: '5px 10px'
    },

    name: {
        fontWeight: 'bold',
        marginLeft: 10,
        textDecoration: 'none'
    }
}


// ---

const mapStateToProps = (state) => {
    const {snippet} = state
    return {
        _id: snippet._id,
        created: snippet.created,
        description: snippet.description,
        updated: snippet.updated,
        user: snippet.user,
        files: state.files
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadSnippet: (snippetId) => {
            dispatch(actions.api.load(snippetId))
        },

        onRemove: (snippetId) => {
            dispatch(actions.api.remove(snippetId))
        },

        gotoEdit: (snippetId) => {
            dispatch(actions.nav.gotoEdit(snippetId))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewSnippet)