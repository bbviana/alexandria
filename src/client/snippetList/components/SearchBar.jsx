import React, { Component, PropTypes } from 'react'

import { handleEnterKey } from '~/utils/events'

import { Button } from '../../components'

const SearchBar = ({ query, onChange, onSearch}) => {
    return (
        <div className="row">
            <div className="col-md-2">
                Buscar
            </div>

            <div className="col-md-9">
                <input
                    className="form-control"
                    autoFocus
                    value={query}
                    type="text"
                    onChange={({ target }) => onChange(target.value)}
                    onKeyUp={handleEnterKey(() => onSearch({page: 1}))}
                />
            </div>

            <div className="col-md-1">
                <Button onClick={() => onSearch({page: 1})}>
                    Buscar
                </Button>
            </div>
        </div>
    )
}


export default SearchBar