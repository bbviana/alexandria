import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import actions from '../actions'

import Button from './commons/Button'
import CodeEditor from './commons/CodeEditor'
import Columns from './commons/Columns'
import Icon from './commons/Icon'
import MarkdownViewer from './commons/MarkdownViewer'

// ---

const s = {}


class Files extends Component {

    render = () => {
        const { actions, files } = this.props
        const { addFile, changeFileContent, changeFileName, removeFile } = this.props

        return (
            <div>
                {files.map((file, i) =>
                    <File
                        file={file}
                        showDeleteButton={files.length > 1}
                        onChangeContent={changeFileContent}
                        onChangeName={changeFileName}
                        removeFile={() => removeFile(file)}
                        key={i}
                    />
                )}

                <Toolbar addFile={addFile} actions={actions}/>
            </div>
        )
    }
}


const File = ({ file, showDeleteButton, onChangeContent, onChangeName, removeFile }) => {
    const markdownMode = file.type === 'md'
    const sizes = markdownMode ? [6, 6] : [12]

    return (
        <div style={s.file.root}>
            <FileName
                file={file}
                showDeleteButton={showDeleteButton}
                onChange={(value) => onChangeName(file, value)}
                onRemove={removeFile}
            />

            <Columns sizes={sizes}>
                <CodeEditor
                    mode={file.type}
                    value={file.content}
                    onChange={(value) => onChangeContent(file, value)}/>

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


const FileName = ({ file, showDeleteButton, onChange, onRemove }) =>
    <div style={s.fileName}>
        <div className="input-group width-third">

            <input
                className="form-control"
                placeholder="Nome do arquivo incluindo a extensão..."
                type="text"
                value={file.name}
                onChange={({ target }) => onChange(target.value)}/>

            {showDeleteButton &&
            <span className="input-group-btn">
                <DeleteFileButton onClick={onRemove}/>
            </span>}
        </div>
    </div>

s.fileName = {
    backgroundColor: '#f7f7f7',
    borderBottom: '1px solid #d8d8d8',
    padding: '5px 10px'
}


const DeleteFileButton = ({ onClick }) =>
    <Button
        style={s.deleteButton}
        type="danger"
        onClick={onClick}>
        <Icon name="trash"/>
    </Button>

s.deleteButton = {
    borderLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
}


const Toolbar = ({ addFile, actions }) =>
    <div style={s.toolbar.root}>
        <Button onClick={addFile}>
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


// ---

const mapStateToProps = (state) => ({
    files: state.files
})

const mapDispatchToProps = (dispatch) => ({
    addFile: () => {
        dispatch(actions.app.addFile())
    },

    changeFileContent: (file, content) => {
        dispatch(actions.app.changeFileContent(file, content))
    },

    changeFileName: (file, name) => {
        dispatch(actions.app.changeFileName(file, name))
    },

    removeFile: (file) => {
        dispatch(actions.app.removeFile(file))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Files)
