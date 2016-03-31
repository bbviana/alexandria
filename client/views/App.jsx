import React, {Component, PropTypes} from 'react'
import {Button} from '../components'

class App extends Component {

    render = () =>
        <div style={s.root}>
            <Header />
            <div style={s.container} className="container">
                {this.props.children}
            </div>
        </div>
}

const Header = () =>
    <div style={s.header}>
        <div className="container">
            <Logo />
            <SearchInput />
            <CreateBtn />
        </div>
    </div>


const Logo = () =>
    <div style={s.logo}>
        Alexandria
    </div>


class SearchInput extends Component {

    render = () =>
        <form style={s.search}>
            <input style={s.searchInput} className="form-control"
                   type="text" placeholder="Busca..."/>
        </form>
}


class CreateBtn extends Component {

    render = () =>
        <div style={s.createBtn}>
            <Button type="small">Novo snippet</Button>
        </div>
}

const s = {
    root: {},

    header: {
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e5e5e5',
        height: 50,
        lineHeight: '30px',
        paddingTop: 10,
        paddingBottom: 10
    },

    container: {
        marginBottom: 20,
        marginTop: 20
    },

    logo: {
        display: 'inline-block',
        fontWeight: 'bold',
        fontSize: 22,
        fontFamily: 'monospace',
        marginRight: 15,
        verticalAlign: 'middle'
    },

    search: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },

    searchInput: {
        height: 28,
        width: 360
    },

    createBtn: {
        float: 'right'
    }
}

export default App
