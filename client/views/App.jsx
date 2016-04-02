import React, {Component, PropTypes} from 'react'
import {Button} from '../components'
import {Link} from 'react-router'

class App extends Component {

    render = () =>
        <div style={s.root}>
            <Header />
            {this.props.children}
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
    <a style={s.logo} href="/">Alexandria</a>


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
            <Button size="small">Novo snippet</Button>
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

    logo: {
        display: 'inline-block',
        fontWeight: 'bold',
        fontSize: 24,
        fontFamily: 'monospace',
        marginRight: 15,
        textDecoration: 'none',
        verticalAlign: 'middle'
    },

    search: {
        display: 'inline-block',
        verticalAlign: 'middle'
    },

    searchInput: {
        height: 30,
        width: 360
    },

    createBtn: {
        float: 'right'
    }
}

export default App
