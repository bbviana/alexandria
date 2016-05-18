import React, {Component, PropTypes} from 'react'

import * as I from '../../app/components/icons'

const YourSnippetsTitle = () => {
    return (
        <div>
            <I.Repo style={s.icon} />
            <span style={s.title}>Seus Snippets</span>
        </div>
    )
}


const s = {
    icon: {
        color: '#bbb'
    },

    title: {
        color: '#666',
        fontSize: 18,
        marginLeft: 5
    }
}

export default YourSnippetsTitle