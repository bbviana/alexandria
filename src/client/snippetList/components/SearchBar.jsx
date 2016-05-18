import React, { Component, PropTypes } from 'react'

import { handleEnterKey } from '~/utils/events'

import { Button } from '../../components'

const SearchBar = ({ query, onChange, onSearch}) => {
    const handleSearch = () => {
        onSearch({query, language: null, page: 1})
    }

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
                    onKeyUp={handleEnterKey(handleSearch)}
                />
            </div>

            <div className="col-md-1">
                <Button onClick={handleSearch}>
                    Buscar
                </Button>
            </div>
        </div>
    )
}


export default SearchBar