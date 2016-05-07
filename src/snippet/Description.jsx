import React, { Component, PropTypes } from 'react'

const s = {}

const Description = ({value, onChange}) =>
    <input
        style={s.root}
        className="form-control input-contrast"
        autoFocus
        placeholder="Descrição do snippet..."
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
    />


export default Description