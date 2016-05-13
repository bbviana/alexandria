import React, { Component, PropTypes } from 'react'

import snippet from '../../snippet'
const { Preview } = snippet.components

import PaginationBar from './PaginationBar'

const ResultsPanel = (props) => {
    const { currentPage, results, totalPages, totalResults } = props
    const { onNavigation } = props

    return (
        <div className="col-md-9">
            <h4 style={s.message}>
                Encontramos {totalResults} snippet{totalResults > 1 && 's'}
            </h4>

            {results.map(result =>
                <Preview snippet={result} key={result._id} />
            )}

            <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                onNavigation={onNavigation}
            />
        </div>
    )
}

const s = {
    message: {
        borderBottom: '1px solid #f1f1f1',
        fontWeight: 'bold',
        marginBottom: 20,
        paddingBottom: 20
    }
}

export default ResultsPanel