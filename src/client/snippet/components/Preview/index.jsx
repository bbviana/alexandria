import { Component, PropTypes } from 'react'

import Info from '../Info'

import CodePreview from './CodePreview'
import StatsBar from './StatsBar'

const Preview = ({ snippet }) => {
    const {
        _id,
        created,
        description,
        files,
        updated,
        user
        } = snippet

    const firstFile = files[0]

    return (
        <div style={s.root}>
            <div>
                <Info
                    created={created}
                    file={firstFile && firstFile.name}
                    snippetId={_id}
                    updated={updated}
                    user={user}
                />
                <StatsBar snippet={snippet} />
            </div>

            <div style={s.description}>
                {description}
            </div>

            {firstFile &&
            <CodePreview file={firstFile} snippetId={_id} />}
        </div>
    )
}

const s = {
    root: {},

    description: {
        color: '#767676',
        marginLeft: 42
    }
}

export default Preview