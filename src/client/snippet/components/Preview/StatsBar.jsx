import React, { Component, PropTypes } from 'react'

import * as I from '../../../app/components/icons'

const StatsBar = ({ snippet }) => {
    return (
        <div style={s.root}>
            <a style={s.link} href={"/details/" + snippet._id}>
                <I.Code />
                <span style={s.text}>
                    {snippet.files.length} arquivo{snippet.files.length > 1 && 's'}
                </span>
            </a>

            <a style={s.link} href={"/details/" + snippet._id}>
                <I.Star />
                <span style={s.text}>
                    {snippet.files.length} star{snippet.files.length > 1 && 's'}
                </span>
            </a>
        </div>
    )
}

const s = {
    root: {
        float: 'right'
    },

    link: {
        color: '#767676',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 12
    },

    text: {
        marginLeft: 5,
        verticalAlign: 'middle'
    }
}

export default StatsBar