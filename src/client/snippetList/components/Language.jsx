import React, { Component, PropTypes } from 'react'

import languages from '~/utils/languages'
import m from '~/utils/m'
import * as strings from '~/utils/strings'
import styles from '~/utils/styles'

import { Hover } from '../../decorators'
import { Icon } from '../../components'

class Language extends Component {

    render = () => {
        const { language, selected } = this.props
        const { hover } = this.props // Hover

        let href = `/search?&query=.`

        if (!selected) {
            href += `&language=${language.name}`
        }

        return (
            <a
                style={styles(s.root, {hover, selected})}
                href={href}
            >
                <span style={m(s.bar, {width: language.percent + "%"})} />

                <span>
                    {strings.capitalize(languages[language.name])}
                </span>

                <span style={s.total}>
                    {selected ?
                        <Icon name="times" /> :
                        language.count
                    }
                </span>
            </a>
        )
    }
}

const s = {
    root: {
        borderRadius: 3,
        color: 'inherit',
        display: 'block',
        fontSize: 12,
        marginBottom: 5,
        padding: '4px 10px',
        position: 'relative',
        textDecoration: 'inherit',

        hover: {
            backgroundColor: '#f1f1f1'
        },

        selected: {
            backgroundColor: '#4078c0',
            color: '#fff'
        }
    },

    bar: {
        background: '#f1f1f1',
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: -1
    },

    total: {
        fontWeight: 'bold',
        float: 'right'
    }
}

export  default Hover(Language)