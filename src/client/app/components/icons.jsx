import React from 'react'

import m from '~/utils/m'

export const Code = ({ style }) =>
    <SVGIcon
        style={style}
        height="16"
        width="12"
        path="M7.5 5l2.5 2.5-2.5 2.5-0.75-0.75 1.75-1.75-1.75-1.75 0.75-0.75z m-3 0L2 7.5l2.5 2.5 0.75-0.75-1.75-1.75 1.75-1.75-0.75-0.75zM0 13V2c0-0.55 0.45-1 1-1h10c0.55 0 1 0.45 1 1v11c0 0.55-0.45 1-1 1H1c-0.55 0-1-0.45-1-1z m1 0h10V2H1v11z"
    />


export const Repo = ({ style }) =>
    <SVGIcon
        style={style}
        height="32"
        width="24"
        viewBox="0 0 12 16"
        path="M4 9h-1v-1h1v1z m0-3h-1v1h1v-1z m0-2h-1v1h1v-1z m0-2h-1v1h1v-1z m8-1v12c0 0.55-0.45 1-1 1H6v2l-1.5-1.5-1.5 1.5V14H1c-0.55 0-1-0.45-1-1V1C0 0.45 0.45 0 1 0h10c0.55 0 1 0.45 1 1z m-1 10H1v2h2v-1h3v1h5V11z m0-10H2v9h9V1z"
    />


export const Star = ({ style }) =>
    <SVGIcon
        style={style}
        height="16"
        width="14"
        path="M14 6l-4.9-0.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14l4.33-2.33 4.33 2.33L10.4 9.26 14 6z"
    />


const SVGIcon = ({ style, path, height, viewBox, width }) => {
    viewBox = viewBox || `0 0 ${width} ${height}`

    return (
        <svg style={m(s, style)} viewBox={viewBox} height={height} width={width}>
            <path d={path} />
        </svg>
    )
}

const s = {
    fill: 'currentColor',
    verticalAlign: 'middle'
}
