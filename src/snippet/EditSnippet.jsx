//region Imports
import React, {Component, PropTypes} from 'react'

import AppStore from '~/app/AppStore'

import Button from '~/app/components/Button'
import Icon from '~/app/components/Icon'

import connect from '~/app/helpers/connect'

import App from '~/app/layouts/App'
import Container from '~/app/layouts/Container'
import PageHeader from '~/app/layouts/PageHeader'

import Files from '~/file/Files'

import Description from './Description'
import RemoveSnippetBtn from './RemoveSnippetBtn'
//endregion

class Edit extends Component {
    componentDidMount = () => {
        AppStore.load(this.props.params.id)
    }

    render = ({_id, description, files} = this.props) =>
        <App>
            <PageHeader>
                <Icon style={s.codeIcon} name="file-code-o"/>
                <span style={s.title}>
                    Editando <a href={"/view/" + _id}>{files[0].name}</a>
                </span>
                <RemoveSnippetBtn style={s.removeSnippetBtn} id={_id}/>
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


const Actions = ({id}) =>
    <div>
        <Button style={{marginRight: 10}} type="danger" onClick={() => AppStore.gotoView(id)}>
            Cancelar Edição
        </Button>
        <Button type="primary" onClick={() => AppStore.save()}>
            Salvar alterações
        </Button>
    </div>


// Styles

const s = {
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

    removeSnippetBtn: {
        float: 'right'
    }
}

const mapStateToProps = state => ({
    _id: state._id,
    description: state.description,
    files: state.files
})

export default connect(Edit, AppStore, mapStateToProps)