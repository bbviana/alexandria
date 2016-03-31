import React, {Component, PropTypes} from 'react'
import {AppStore} from '../stores'
import {connect} from '../helpers'
import {Button, CodeEditor, Icon} from '../components'

class View extends Component {
    componentDidMount = () => {
        AppStore.load(this.props.params.id)
    }

    render = ({description, files} = this.props) =>
        <div style={s.root}>
            <div>{description}</div>

            {files.map((file, i) =>
                <div key={i}>
                    <div>{file.name}</div>
                    <File file={file}/>
                </div>
            )}
        </div>
}

const File = ({file}) =>
    <div style={s.file}>
        <CodeEditor
            maxLines={99999}
            mode={file.type}
            highlightActiveLine={false}
            highlightGutterLine={false}
            readOnly={true}
            showFoldWidgets={false}
            value={file.content}
        />
    </div>

const s = {
    root: {},

    file: {
        marginTop: 20,
        marginBottom: 15,
        border: '1px solid #ddd',
        borderRadius: 3
    }
}


const mapStateToProps = state => ({
    description: state.description,
    files: state.files
})

export default connect(View, AppStore, mapStateToProps)