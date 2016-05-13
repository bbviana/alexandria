import React, { Component, PropTypes } from 'react'

const Description = ({ readOnly, value, onChange }) => {
    return readOnly ?
        <Output value={value} /> :
        <Input value={value} onChange={onChange} />
}

const Input = ({ value, onChange }) => {
    return (
        <input
            style={s.input}
            className="form-control input-contrast"
            autoFocus
            placeholder="Descrição do snippet..."
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    )
}
const Output = ({ value }) => {
    return <div style={s.output}>{value}</div>
}

const s = {
    input: {},
    output: {
        color: '#666',
        fontSize: 20,
        marginBottom: 20
    }
}

export default Description