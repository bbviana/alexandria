import React, {Component, PropTypes} from 'react'
import {Dates} from '../app/helpers'

class Info extends Component {

    render = ({created, file, snippetId, updated, user} = this.props) =>
        <div style={s.root}>
            <Avatar />
            <Breadcrumb file={file} snippetId={snippetId} user={user}/>
            <TimeStamp created={created} updated={updated}/>
        </div>
}

const Avatar = () =>
    <img style={s.avatar} src="https://avatars3.githubusercontent.com/u/1538307?v=3&s=52"/>


const Breadcrumb = ({file, snippetId, user}) =>
    <div style={s.breadcrumb}>
        <a href={"/" + user.login}>{user.login}</a> /
        <strong><a href={"/view/" + snippetId}>{file}</a></strong>
    </div>


const TimeStamp = ({created, updated}) => {
    let date = updated ? new Date(updated) : new Date(created)
    let message = updated ? 'Editado' : 'Criado'

    return (
        <div style={s.timestamp} title={date}>
            {message} {Dates.timeAgo(date)}
        </div>
    )
}


// Styles

const s = {}

s.root = {
    display: 'inline-block'
}

s.avatar = {
    borderRadius: 3,
    display: 'inline-block',
    height: 28,
    width: 28
}

s.breadcrumb = {
    display: 'inline-block',
    fontSize: 20,
    marginLeft: 10,
    verticalAlign: 'middle'
}

s.timestamp = {
    color: '#999',
    fontSize: 13,
    marginLeft: s.avatar.width + s.breadcrumb.marginLeft
}

export default Info