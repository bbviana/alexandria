import React, { Component, PropTypes } from 'react'

const EmptyResults = ({ query }) => {
    return (
        <div style={s.root}>
            <Icon style={s.icon} name="search" />

            <div style={s.text}>
                Não encontramos nenhum snippet com o termo '{query}'
            </div>

            <div>
                Para uma busca avançada, use alguns dos <a href="">prefixos</a>
            </div>
        </div>
    )
}

const s = {
    root: {
        backgroundColor: '#fafafa',
        border: '1px solid #e5e5e5',
        borderRadius: 3,
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
        padding: 30,
        position: 'relative',
        textAlign: 'center'
    },

    icon: {
        color: '#aaa',
        fontSize: 32,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold'
    }
}

export default EmptyResults