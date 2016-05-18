import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import FileEditor from './FileEditor'
import Toolbar from './Toolbar'

class FileListEditor extends Component {

    render = () => {
        const { children, files } = this.props
        const { addFile, changeFile, removeFile } = this.props

        return (
            <div style={s}>
                {files.map((file, i) =>
                    <FileEditor
                        file={file}
                        showDeleteButton={files.length > 1}
                        onChange={(newValues) => changeFile(file, newValues)}
                        onDelete={() => removeFile(file)}
                        key={i}
                    />
                )}

                <Toolbar addFile={addFile}>
                    {children}
                </Toolbar>
            </div>
        )
    }
}

const s = {}

const mapDispatchToProps = (dispatch) => ({
    addFile: () => {
        dispatch(actions.addFile())
    },

    changeFile: (file, newValues) => {
        dispatch(actions.changeFile(file, newValues))
    },

    removeFile: (file) => {
        dispatch(actions.removeFile(file))
    }
})

export default connect(
    null,
    mapDispatchToProps
)(FileListEditor)
