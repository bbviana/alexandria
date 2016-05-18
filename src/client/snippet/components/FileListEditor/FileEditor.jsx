import React, { Component, PropTypes } from 'react'

import { CodeEditor, Columns, MarkdownViewer } from '../../../components'

import ButtonDelete from './ButtonDelete'

const FileEditor = ({ file, showDeleteButton, onChange, onDelete }) => {
    const markdownMode = file.type === 'md'
    const sizes = markdownMode ? [6, 6] : [12]

    return (
        <div style={s.root}>
            <FileHeader
                fileName={file.name}
                showDeleteButton={showDeleteButton}
                onChange={(name) => onChange({name})}
                onDelete={onDelete}
            />

            <Columns sizes={sizes}>
                <CodeEditor
                    mode={file.type}
                    value={file.content}
                    onChange={(content) => onChange({content})}
                />

                {markdownMode &&
                <MarkdownViewer style={s.markdownViewer} code={file.content} />}
            </Columns>
        </div>
    )
}

const FileHeader = ({ fileName, showDeleteButton, onChange, onDelete }) => {
    return (
        <div style={s.fileHeader}>
            <div className="input-group width-third">
                <input
                    className="form-control"
                    placeholder="Nome do arquivo incluindo a extensão..."
                    type="text"
                    value={fileName}
                    onChange={({ target }) => onChange(target.value)}
                />

                {showDeleteButton &&
                <ButtonDelete onClick={onDelete} />}
            </div>
        </div>
    )
}

const s = {
    root: {
        border: '1px solid #ddd',
        borderRadius: 3,
        marginTop: 20
    },

    fileHeader: {
        backgroundColor: '#f7f7f7',
        borderBottom: '1px solid #d8d8d8',
        padding: '5px 10px'
    },

    markdownViewer: {
        height: 250,
        overflow: 'auto',
        padding: 10
    }
}

export default FileEditor