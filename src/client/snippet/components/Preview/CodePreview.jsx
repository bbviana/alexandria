import React, { Component, PropTypes } from 'react'

import styles from '~/utils/styles'

import { CodeEditor } from '../../../components'

class CodePreview extends Component {
    state = {
        hover: false
    }

    handleMouseOut = () => this.setState({hover: false})
    handleMouseOver = () => this.setState({hover: true})

    render = () => {
        const { file, snippetId } = this.props

        return (
            <div
                style={styles(s.root, this.state)}
                onMouseOut={this.handleMouseOut}
                onMouseOver={this.handleMouseOver}
            >
                <a style={s.link} href={"/details/" + snippetId}>
                    {this.state.hover &&
                    <span style={s.linkMessage}>
                        Ver <strong>{file.name}</strong>
                    </span>}
                </a>

                <CodeEditor
                    displayIndentGuides={false}
                    maxLines={10}
                    mode={file.type}
                    highlightActiveLine={false}
                    highlightGutterLine={false}
                    readOnly
                    showFoldWidgets={false}
                    value={file.content}
                />
            </div>
        )
    }
}

const s = {
    root: {
        border: '1px solid',
        borderColor: '#ddd',
        borderRadius: 3,
        marginBottom: 50,
        marginTop: 15,
        padding: 1, // para que a borda apareça
        position: 'relative',

        hover: {
            borderColor: '#4078c0'
        }
    },

    link: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 2
    },

    linkMessage: {
        backgroundColor: '#4078c0',
        color: '#fff',
        fontSize: 12,
        padding: '2px 8px',
        position: 'absolute',
        right: 0,
        top: 0
    }
}

export default CodePreview