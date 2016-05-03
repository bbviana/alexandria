import React, {Component, PropTypes} from 'react'
import Dates from '~/app/helpers/Dates'

const s = {}

// ---

class Info extends Component {

    render = ({created, file, snippetId, updated, user} = this.props) =>
        <div style={s.info.root}>
            <Avatar avatarURL={user.avatarURL}/>
            <div style={s.info.rightArea}>
                <Breadcrumb file={file} snippetId={snippetId} user={user}/>
                <TimeStamp created={created} updated={updated}/>
            </div>
        </div>
}

s.info = {
    root: {
        display: 'inline-block'
    },

    rightArea: {
        display: 'inline-block',
        paddingLeft: 10
    }
}

// ---

const Avatar = ({avatarURL}) =>
    <img style={s.avatar} src={avatarURL}/>

s.avatar = {
    borderRadius: 3,
    display: 'inline-block',
    height: 32,
    verticalAlign: 'top',
    width: 32
}

// ---

const Breadcrumb = ({file, snippetId, user}) =>
    <div style={s.breadcrumb}>
        <a href={"/" + user.login}>{user.login}</a>
        &nbsp;/&nbsp;
        <a href={"/view/" + snippetId}>{file}</a>
    </div>

s.breadcrumb = {
    display: 'inline-block',
    fontSize: 14,
    fontWeight: 'bold'
}

// ---

const TimeStamp = ({created, updated}) => {
    let date = updated ? new Date(updated) : new Date(created)
    let message = updated ? 'Editado' : 'Criado'

    return (
        <div style={s.timestamp} title={date}>
            {message} {Dates.timeAgo(date)}
        </div>
    )
}

s.timestamp = {
    color: '#999',
    fontSize: 11
}

// ---

export default Info