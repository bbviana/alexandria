//region Imports
import React, {Component, PropTypes} from 'react'

import snippetActions from '~/app/actions/snippetActions'

import Button from '~/app/components/Button'
import CodeEditor from '~/app/components/CodeEditor'
import Icon from '~/app/components/Icon'
import MarkdownViewer from '~/app/components/MarkdownViewer'

import connect from '~/app/helpers/connect'

import App from '~/app/layouts/App'
import Container from '~/app/layouts/Container'
import PageHeader from '~/app/layouts/PageHeader'

import snippetStore from '~/app/stores/snippetStore'

import Info from './Info'
import RemoveSnippetButton from './RemoveSnippetButton'
//endregion

const s = {}


class View extends Component {
    componentDidMount = () => {
        snippetActions.load(this.props.params.id)
    }

    render = ({_id, created, description, files, updated, user} = this.props) =>
        <App>
            <PageHeader>
                <Info
                    created={created}
                    file={files[0] && files[0].name}
                    snippetId={_id}
                    updated={updated}
                    user={user}
                />
                <Actions id={_id}/>
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
}


const Actions = ({id}) =>
    <div style={s.actions}>
        <EditBtn id={id}/>
        <RemoveSnippetButton id={id}/>
    </div>

s.actions = {
    float: 'right'
}


const EditBtn = ({id}) =>
    <Button size="small" onClick={() => AppStore.gotoEdit(id)}>
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


// Connect Store


const mapStateToProps = state => ({
    _id: state._id,
    created: state.created,
    description: state.description,
    files: state.files,
    updated: state.updated,
    user: state.user
})

export default connect(View, snippetStore, mapStateToProps)