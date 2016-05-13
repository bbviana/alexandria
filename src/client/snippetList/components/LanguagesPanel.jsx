import React, { Component, PropTypes } from 'react'

import Language from './Language'

const LanguagesPanel = ({ languages, selectedLanguage }) => {
    return (
        <div style={s.root} className="col-md-3">
            <h4 style={s.title}>
                Linguagens
            </h4>

            <div style={s.languages}>
                {languages.map(language =>
                    <Language
                        language={language}
                        selected={language.name == selectedLanguage}
                        key={language.name}
                    />
                )}
            </div>
        </div>
    )
}

const s = {
    root: {},

    languages: {
        color: '#767676'
    },

    title: {
        fontWeight: 'bold'
    }
}

export default LanguagesPanel