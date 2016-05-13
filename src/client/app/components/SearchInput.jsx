import React, { Component, PropTypes } from 'react'

import { handleEnterKey } from '~/utils/events'

const SearchInput = ({ onEnterKey }) => {
    return (
        <input
            style={s}
            className="form-control"
            placeholder="Busca..."
            type="text"
            onKeyUp={handleEnterKey(e => onEnterKey(e.target.value))}
        />)
}

const s = {
    display: 'inline-block',
    height: 30,
    verticalAlign: 'middle',
    width: 360
}

export default SearchInput