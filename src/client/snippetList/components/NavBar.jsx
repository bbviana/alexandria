import React, {Component, PropTypes} from 'react'

import styles from '~/utils/styles'

import * as I from '../../app/components/icons'

const NavBar = ({ selected }) => {
    return (
        <nav style={s.root}>
            <a
                style={styles(s.link, {selected: selected == 'all'})}
                href="/bbviana"
            >
                <I.Code />
                <span style={s.text}>Todos</span>
                <span style={s.counter}>2</span>
            </a>

            <a
                style={styles(s.link, {selected: selected == 'starred'})}
                href="/bbviana/starred"
            >
                <I.Star />
                <span style={s.text}>Favoritos</span>
                <span style={s.counter}>1</span>
            </a>
        </nav>
    )
}

const s = {
    root: {
        float: 'left',
        marginBottom: -21,
        marginTop: 20
    },

    counter: {
        backgroundColor: '#eee',
        borderRadius: 20,
        color: '#666',
        display: 'inline-block',
        fontSize: 11,
        fontWeight: 'bold',
        lineHeight: '1',
        padding: '2px 5px'
    },

    link: {
        border: 'solid transparent',
        borderRadius: '3px 3px 0 0',
        borderWidth: '3px 1px 1px',
        color: '#666',
        float: 'left',
        padding: '7px 15px 8px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',

        selected: {
            backgroundColor: '#fff',
            borderColor: '#d26911 #e5e5e5 transparent',
            color: '#111'
        }
    },

    text: {
        marginLeft: 5,
        marginRight: 5
    }
}

export default NavBar