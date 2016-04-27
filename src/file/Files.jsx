//region Imports
import React, {Component, PropTypes} from 'react'

import AppStore from '~/app/AppStore'

import Button from '~/app/components/Button'
import CodeEditor from '~/app/components/CodeEditor'
import Columns from '~/app/components/Columns'
import Icon from '~/app/components/Icon'
import MarkdownViewer from '~/app/components/MarkdownViewer'

const s = {}
//endregion


class Files extends Component {

    render = ({files, actions} = this.props) =>
        <div>
            {files.map((file, i) =>
                <File
                    file={file}
                    showDeleteFileBtn={files.length > 1}
                    key={i}/>
            )}

            <Toolbar actions={actions}/>
        </div>
}


const File = ({file, showDeleteFileBtn}) => {
    const markdownMode = file.type === 'md'
    const sizes = markdownMode ? [6, 6] : [12]

    return (
        <div style={s.file.root}>
            <FileName file={file} showDeleteFileBtn={showDeleteFileBtn}/>

            <Columns sizes={sizes}>
                <CodeEditor
                    mode={file.type}
                    value={file.content}
                    onChange={newValue => AppStore.changeFileContent(file, newValue)}/>

                {markdownMode &&
                <MarkdownViewer style={s.file.markdownViewer} code={file.content}/>}
            </Columns>
        </div>
    )
}

s.file = {
    root: {
        border: '1px solid #ddd',
        borderRadius: 3,
        marginTop: 20
    },

    markdownViewer: {
        height: 250,
        overflow: 'auto',
        padding: 10
    }
}


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

s.fileName = {
    backgroundColor: '#f7f7f7',
    borderBottom: '1px solid #d8d8d8',
    padding: '5px 10px'
}


const DeleteFileBtn = ({file}) =>
    <Button
        style={s.deleteButton}
        type="danger"
        onClick={() => AppStore.removeFile(file)}>
        <Icon name="trash"/>
    </Button>

s.deleteButton = {
    borderLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
}


const Toolbar = ({actions}) =>
    <div style={s.toolbar.root}>
        <Button onClick={() => AppStore.addFile()}>
            <Icon name="plus-square"/> Adicionar arquivo
        </Button>
        <div style={s.toolbar.right}>
            {actions}
        </div>
    </div>

s.toolbar = {
    root: {
        marginTop: 20
    },

    right: {
        float: 'right'
    }
}

export default Files