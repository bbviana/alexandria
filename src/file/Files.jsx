//region Imports
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from '~/app/actions'

import Button from '~/app/components/Button'
import CodeEditor from '~/app/components/CodeEditor'
import Columns from '~/app/components/Columns'
import Icon from '~/app/components/Icon'
import MarkdownViewer from '~/app/components/MarkdownViewer'
//endregion

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
                        changeFileContent={changeFileContent}
                        changeFileName={changeFileName}
                        removeFile={(file) => removeFile(file)}
                        key={i}
                    />
                )}

                <Toolbar addFile={addFile} actions={actions}/>
            </div>
        )
    }
}


const File = ({ file, showDeleteButton, changeFileContent, changeFileName, removeFile }) => {
    const markdownMode = file.type === 'md'
    const sizes = markdownMode ? [6, 6] : [12]

    return (
        <div style={s.file.root}>
            <FileName
                file={file}
                showDeleteButton={showDeleteButton}
                onChange={(value) => changeFileName(file, value)}
                onRemove={removeFile}
            />

            <Columns sizes={sizes}>
                <CodeEditor
                    mode={file.type}
                    value={file.content}
                    onChange={(value) => changeFileContent(file, value)}/>

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
        dispatch(actions.addFile())
    },

    changeFileContent: (file, content) => {
        dispatch(actions.changeFileContent(file, content))
    },

    changeFileName: (file, name) => {
        dispatch(actions.changeFileName(file, name))
    },

    removeFile: (file) => {
        dispatch(actions.removeFile(file))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Files)
