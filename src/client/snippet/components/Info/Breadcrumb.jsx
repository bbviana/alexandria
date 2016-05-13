import React, { Component, PropTypes } from 'react'

const Breadcrumb = ({ fileName, snippetId, userName }) => {
    return (
        <div style={s}>
            <a href={"/" + userName}>{userName}</a>
            &nbsp;/&nbsp;
            <a href={"/details/" + snippetId}>{fileName}</a>
        </div>
    )
}

const s = {
    display: 'inline-block',
    fontSize: 14,
    fontWeight: 'bold'
}

export default Breadcrumb