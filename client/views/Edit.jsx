import React, {Component, PropTypes} from 'react'
import {AppStore} from '../stores'
import {Button, Icon} from '../components'
import {Container, Description, Files, PageHeader, RemoveSnippetBtn} from './'
import {connect} from '../helpers'

class Edit extends Component {
    componentDidMount = () => {
        AppStore.load(this.props.params.id)
    }

    render = ({_id, description, files} = this.props) =>
        <div style={s.root}>
            <PageHeader>
                Editando {files[0].name}

                <RemoveSnippetBtn id={_id}/>
            </PageHeader>

            <Container>
                <Description value={description}/>

                <Files
                    files={files}
                    actions={<Actions id={_id}/>}
                />

            </Container>
        </div>
}


const Actions = ({id}) =>
    <div>
        <Button type="danger" onClick={() => AppStore.gotoView(id)}>
            Cancelar Edição
        </Button>
        <Button type="primary" onClick={() => AppStore.save()}>
            Salvar alterações
        </Button>
    </div>


// Styles

const s = {
    root: {}
}

const mapStateToProps = state => ({
    _id: state._id,
    description: state.description,
    files: state.files
})

export default connect(Edit, AppStore, mapStateToProps)