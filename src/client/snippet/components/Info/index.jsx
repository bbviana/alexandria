import { Component, PropTypes } from 'react'

import Avatar from './Avatar'
import Breadcrumb from './Breadcrumb'
import TimeStamp from './TimeStamp'

const Info = ({ created, fileName, snippetId, updated, user }) => {
    return (
        <div style={s.root}>
            <Avatar avatarURL={user.avatarURL} />

            <div style={s.rightArea}>
                <Breadcrumb
                    fileName={fileName}
                    snippetId={snippetId}
                    userName={user.login}
                />

                <TimeStamp created={created} updated={updated} />
            </div>
        </div>
    )
}

const s = {
    root: {
        display: 'inline-block'
    },

    rightArea: {
        display: 'inline-block',
        paddingLeft: 10
    }
}

export default Info