import React, {Component, PropTypes} from 'react'
import {Button, CodeEditor, Icon} from '../components'
import {CreateStore} from '../stores'

class Create extends Component {
    state = CreateStore.state

    componentDidMount = () => CreateStore.listen(this)

    componentWillUnmount = () => CreateStore.unlisten(this)

    render = ({description, files, showDeleteBtn} = this.state) =>
        <div style={s.root}>
            <Description value={description}/>

            <FileList files={files} showDeleteBtn={showDeleteBtn}/>

            <Toolbar />
        </div>
}


const Description = ({value}) =>
    <input
        className="form-control input-contrast"
        autoFocus
        placeholder="Descrição do snippet..."
        type="text"
        value={value}
        onChange={e => CreateStore.changeDescription(e.target.value)}
    />


const FileList = ({files, showDeleteBtn}) =>
    <div>
        {files.map(file =>
            <File file={file} showDeleteBtn={showDeleteBtn} key={file.timestamp}/>
        )}
    </div>


const File = ({file, showDeleteBtn}) =>
    <div style={s.file}>
        <FileHeader {...{file, showDeleteBtn}} />

        <CodeEditor
            mode={file.type}
            value={file.value}
            onChange={newValue => CreateStore.changeFileValue(file, newValue)}/>
    </div>


const FileHeader = ({file, showDeleteBtn}) =>
    <div style={s.fileHeader}>
        <div className="input-group width-quarter">

            <input
                className="form-control"
                placeholder="Nome do arquivo incluindo a extensão..."
                type="text"
                value={file.name}
                onChange={e => CreateStore.changeFileName(file, e.target.value)}/>

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
        <Button style={s.saveButton} onClick={() => CreateStore.save()}>
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

    saveButton: {
        float: 'right'
    },

    toolbar: {
        marginTop: 20
    }
}

export default Create