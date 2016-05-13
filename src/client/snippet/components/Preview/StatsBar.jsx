import React, { Component, PropTypes } from 'react'

import { Icon } from '../../../components'

const StatsBar = ({ snippet }) => {
    return (
        <div style={s.root}>
            <a style={s.link} href={"/details/" + snippet._id}>
                <Icon name="file-code-o" />
                {snippet.files.length} arquivo{snippet.files.length > 1 && 's'}
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
        fontSize: 14,
        fontWeight: 'bold'
    }
}

export default StatsBar