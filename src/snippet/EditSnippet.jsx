//region Imports
import React, {Component, PropTypes} from 'react'

import snippetActions from '~/app/actions/snippetActions'

import Button from '~/app/components/Button'
import Icon from '~/app/components/Icon'

import connect from '~/app/helpers/connect'

import App from '~/app/layouts/App'
import Container from '~/app/layouts/Container'
import PageHeader from '~/app/layouts/PageHeader'

import snippetStore from '~/app/stores/snippetStore'

import Files from '~/file/Files'

import Description from './Description'
import RemoveSnippetButtom from './RemoveSnippetButton'
//endregion

const s = {}

class Edit extends Component {
    componentDidMount = () => {
        snippetActions.load(this.props.params.id)
    }

    render = ({_id, description, files} = this.props) =>
        <App>
            <PageHeader>
                <Icon style={s.edit.codeIcon} name="file-code-o"/>
                <span style={s.edit.title}>
                    Editando <a href={"/view/" + _id}>{files[0].name}</a>
                </span>
                <RemoveSnippetButtom style={s.edit.removeButton} id={_id}/>
            </PageHeader>

            <Container>
                <Description value={description}/>

                <Files
                    files={files}
                    actions={<Actions id={_id}/>}
                />

            </Container>
        </App>
}

s.edit = {
    codeIcon: {
        color: '#bbb',
        fontSize: 28,
        marginRight: 10,
        verticalAlign: 'middle'
    },

    title: {
        color: '#666',
        fontSize: 20,
        fontWeight: 'bold',
        verticalAlign: 'middle'
    },

    removeButton: {
        float: 'right'
    }
}


const Actions = ({id}) =>
    <div>
        <Button style={{marginRight: 10}} type="danger" onClick={() => AppStore.gotoView(id)}>
            Cancelar Edição
        </Button>
        <Button type="primary" onClick={() => AppStore.save()}>
            Salvar alterações
        </Button>
    </div>


const mapStateToProps = state => ({
    _id: state._id,
    description: state.description,
    files: state.files
})

export default connect(Edit, snippetStore, mapStateToProps)