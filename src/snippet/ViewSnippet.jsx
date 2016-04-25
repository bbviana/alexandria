//region Imports
import React, {Component, PropTypes} from 'react'

import AppStore from '~/app/AppStore'

import Button from '~/app/components/Button'
import CodeEditor from '~/app/components/CodeEditor'
import Icon from '~/app/components/Icon'

import connect from '~/app/helpers/connect'

import App from '~/app/layouts/App'
import Container from '~/app/layouts/Container'
import PageHeader from '~/app/layouts/PageHeader'

import Info from './Info'
import RemoveSnippetBtn from './RemoveSnippetBtn'
//endregion

class View extends Component {
    componentDidMount = () => {
        AppStore.load(this.props.params.id)
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


// Header

const Actions = ({id}) =>
    <div style={s.actions}>
        <EditBtn id={id}/>
        <RemoveSnippetBtn id={id}/>
    </div>


const EditBtn = ({id}) =>
    <Button size="small" onClick={() => AppStore.gotoEdit(id)}>
        <Icon name="pencil"/> Editar
    </Button>


// Content

const Description = ({value}) =>
    <div style={s.description}>{value}</div>


const File = ({file}) =>
    <div style={s.file} id={'ANCHOR'}>
        <FileHeader value={file.name}/>

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
    </div>


const FileHeader = ({value}) =>
    <div style={s.fileHeader}>
        <Icon name="file-code-o"/>
        <a style={s.fileName} href="#ANCHOR" title="Link Permanente">
            {value}
        </a>
    </div>


// Styles

const s = {}

s.actions = {
    float: 'right'
}

s.description = {
    marginBottom: 20,
    fontSize: 20,
    color: '#666'
}

s.file = {
    marginTop: 20,
    marginBottom: 15,
    border: '1px solid #ddd',
    borderRadius: 3
}

s.fileHeader = {
    backgroundColor: '#f7f7f7',
    borderBottom: '1px solid #d8d8d8',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    fontSize: 14,
    fontFamily: 'monospace',
    height: 45,
    lineHeight: '35px',
    padding: '5px 10px'
}

s.fileName = {
    fontWeight: 'bold',
    marginLeft: 10,
    textDecoration: 'none'
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

export default connect(View, AppStore, mapStateToProps)