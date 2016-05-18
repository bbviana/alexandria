import React, { Component, PropTypes } from 'react'

import * as arrays from '~/utils/arrays'

const PaginationBar = ({ currentPage, totalPages, onNavigation }) => {
    return (
        <nav style={s}>
            <ul className="pagination">
                <li className={currentPage == 1 && 'disabled'}>
                    <a href="javascript: void(0)" onClick={() => onNavigation(currentPage - 1)}>
                        <span>&laquo;</span>
                    </a>
                </li>

                {arrays.range(1, totalPages).map((page) =>
                    <li className={page == currentPage && 'active'} key={page}>
                        <a href="javascript: void(0)" onClick={() => onNavigation(page)}>
                            {page}
                        </a>
                    </li>
                )}

                <li className={currentPage == totalPages && 'disabled'}>
                    <a href="javascript: void(0)" onClick={() => onNavigation(currentPage + 1)}>
                        <span>&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

const s = {
    textAlign: 'center'
}

export default PaginationBar

