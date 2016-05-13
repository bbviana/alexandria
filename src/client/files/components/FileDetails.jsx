import React, { Component, PropTypes } from 'react'

import { CodeEditor, Icon, MarkdownViewer } from '../../components'

const FileDetails = ({ file }) => {
    const markdownMode = file.type === 'md'

    return (
        <div style={s.root} id={'ANCHOR'}>
            <FileHeader fileName={file.name} />

            {markdownMode ?
                <MarkdownViewer code={file.content} /> :
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
    )
}

const FileHeader = ({ fileName }) => {
    return (
        <div style={s.header}>
            <Icon name="file-code-o" />

            <a style={s.name} href="#ANCHOR" title="Link Permanente">
                {fileName}
            </a>
        </div>
    )
}

const s = {
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

export default FileDetails