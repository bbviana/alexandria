import React, {Component, PropTypes} from 'react'
import {Button, CodeEditor, Icon} from '../components'
import {CreateStore} from '../stores'

class Create extends Component {

    componentDidMount = () => CreateStore.listen(this)
    componentWillUnmount = () => CreateStore.unlisten(this)

    state = CreateStore.state

    render = () =>
        <div style={s.root}>
            <Description />
            <FileList
                files={this.state.files}
                showDeleteBtn={this.state.showDeleteBtn}/>
            <Toolbar />
        </div>
}

const Description = () =>
    <input className="form-control input-contrast" type="text"
           placeholder="Descrição do snippet..."/>

const FileList = ({files, showDeleteBtn}) =>
    <div>
        {files.map((file, i) =>
            <File file={file} showDeleteBtn={showDeleteBtn} key={i}/>
        )}
    </div>


const File = (props) =>
    <div style={s.file}>
        <FileHeader {...props} />
        <CodeEditor value={props.file.value}
                    onChange={(newValue) => CreateStore.changeFile(props.file, newValue)}/>
    </div>


const FileHeader = ({file, index, showDeleteBtn}) =>
    <div style={s.fileHeader}>
        <div className="input-group width-quarter">
            <input className="form-control" type="text"
                   placeholder="Nome do arquivo incluindo a extensão..."/>
            {showDeleteBtn &&
            <span className="input-group-btn">
                <DeleteFileBtn file={file}/>
            </span>}
        </div>
    </div>

const DeleteFileBtn = ({file}) =>
    <Button onClick={() => CreateStore.removeFile(file)}>
        <Icon name="trash"/>
    </Button>

const Toolbar = () =>
    <div style={s.toolbar}>
        <Button onClick={() => CreateStore.addFile()}>
            <Icon name="plus-square"/> Adicionar arquivo
        </Button>
        <Button style={{float:'right'}}>
            <Icon name="floppy-o"/> Salvar snippet
        </Button>
    </div>


const s = {
    root: {},

    fileList: {},

    file: {
        border: '1px solid #ddd',
        borderRadius: 3,
        marginTop: 20
    },

    fileHeader: {
        backgroundColor: '#f7f7f7',
        borderBottom: '1px solid #d8d8d8',
        padding: '5px 10px'
    },

    toolbar: {
        marginTop: 20
    }
}

export default Create