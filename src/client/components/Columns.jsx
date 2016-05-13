import React, { Children, Component, PropTypes } from 'react'

const Columns = ({children, sizes}) => {
    return (
        <div style={s} className="row">
            {Children.map(children, (child, i) =>
                <div className={"col-md-" + sizes[i]}>
                    {child}
                </div>
            )}
        </div>
    )
}

const s = {}

export default Columns