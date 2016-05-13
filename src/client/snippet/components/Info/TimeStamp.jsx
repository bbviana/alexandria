import React, { Component, PropTypes } from 'react'

import { timeAgo } from '~/utils/dates'

const TimeStamp = ({ created, updated }) => {
    let date = updated ? new Date(updated) : new Date(created)
    let message = updated ? 'Editado' : 'Criado'

    return (
        <div style={s} title={date}>
            {message} {timeAgo(date)}
        </div>
    )
}

const s = {
    color: '#999',
    fontSize: 11
}

export  default TimeStamp