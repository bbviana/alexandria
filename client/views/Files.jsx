import React, {Component, PropTypes} from 'react'
import {AppStore} from '../stores'
import {Button, CodeEditor, Icon} from '../components'

class Files extends Component {

    render = ({files, actions} = this.props) =>
        <div style={s.root}>
            {files.map((file, i) =>
                <File
                    file={file}
                    showDeleteFileBtn={files.length > 1}
                    key={i}/>
            )}

            <Toolbar actions={actions}/>
        </div>
}


const File = ({file, showDeleteFileBtn}) =>
    <div style={s.file}>
        <FileName file={file} showDeleteFileBtn={showDeleteFileBtn} />

        <CodeEditor
            mode={file.type}
            value={file.content}
            onChange={newValue => AppStore.changeFileContent(file, newValue)}/>
    </div>


const FileName = ({file, showDeleteFileBtn}) =>
    <div style={s.fileName}>
        <div className="input-group width-third">

            <input
                className="form-control"
                placeholder="Nome do arquivo incluindo a extensão..."
                type="text"
                value={file.name}
                onChange={e => AppStore.changeFileName(file, e.target.value)}/>

            {showDeleteFileBtn &&
            <span className="input-group-btn">
                <DeleteFileBtn file={file}/>
            </span>}
        </div>
    </div>


const DeleteFileBtn = ({file}) =>
    <Button
        style={s.deleteButton}
        type="danger"
        onClick={() => AppStore.removeFile(file)}>
        <Icon name="trash"/>
    </Button>


const Toolbar = ({actions}) =>
    <div style={s.toolbar}>
        <Button onClick={() => AppStore.addFile()}>
            <Icon name="plus-square"/> Adicionar arquivo
        </Button>
        <div style={s.toolbarRight}>
            {actions}
        </div>
    </div>

// Styles

const s = {
    root: {},

    deleteButton: {
        borderLeft: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },

    fileList: {},

    file: {
        border: '1px solid #ddd',
        borderRadius: 3,
        marginTop: 20
    },

    fileName: {
        backgroundColor: '#f7f7f7',
        borderBottom: '1px solid #d8d8d8',
        padding: '5px 10px'
    },

    toolbar: {
        marginTop: 20
    },

    toolbarRight: {
        float: 'right'
    }
}

export default Files