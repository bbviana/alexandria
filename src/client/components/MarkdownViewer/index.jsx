import React, { Component, PropTypes } from 'react'
import highlight from 'highlight.js'
import marked from 'marked'

import m from '~/utils/m'

marked.setOptions({
    highlight: code => highlight.highlightAuto(code).value
})

class MarkdownViewer extends Component {
    // nao funciona
    //static defaultProps = {
    //    code: 'teste'
    //}


    rawMarkup = () => {
        var rawMarkup = marked(this.props.code || "*Markdown preview*")
        return {__html: rawMarkup};
    }

    render = () => {
        const {code, style} = this.props

        return (
            <div
                style={m(s, style)}
                className="markdown markdown-body"
                dangerouslySetInnerHTML={this.rawMarkup()}>

            </div>
        )
    }
}

const s = {
    padding: 45
}

export default MarkdownViewer