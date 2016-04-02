import React, {Component, PropTypes} from 'react'
import {AppStore} from '../stores'
import {Button, CodeEditor, Icon} from '../components'
import {Container, PageHeader, RemoveSnippetBtn} from './'
import {connect} from '../helpers'

class View extends Component {
    componentDidMount = () => {
        AppStore.load(this.props.params.id)
    }

    render = ({_id, description, files, user} = this.props) =>
        <div style={s.root}>
            <PageHeader>
                <Info user={user} file={files[0] && files[0].name}/>
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
        </div>
}


// Header

const Info = ({user, file}) =>
    <div style={s.info}>
        <Avatar />
        <Breadcrumb user={user} file={file}/>
        <TimeStamp />
    </div>


const Avatar = () =>
    <img style={s.avatar} src="https://avatars3.githubusercontent.com/u/1538307?v=3&s=52"/>


const Breadcrumb = ({user, file}) =>
    <div style={s.breadcrumb}>
        <a href={"/" + user}>{user}</a> / <strong><a href="">{file}</a></strong>
    </div>


const TimeStamp = () =>
    <div style={s.timestamp}>
        Criado 5 horas atrás
    </div>


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

s.root = {}

s.actions = {
    float: 'right'
}

s.avatar = {
    borderRadius: 3,
    display: 'inline-block',
    height: 28,
    width: 28
}

s.breadcrumb = {
    display: 'inline-block',
    fontSize: 20,
    marginLeft: 10,
    verticalAlign: 'middle'
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

s.info = {
    display: 'inline-block'
}

s.timestamp = {
    color: '#999',
    fontSize: 13,
    marginLeft: s.avatar.width + s.breadcrumb.marginLeft
}


// Connect Store


const mapStateToProps = state => ({
    _id: state._id,
    description: state.description,
    files: state.files,
    user: state.user
})

export default connect(View, AppStore, mapStateToProps)