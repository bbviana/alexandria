import React, {Component, PropTypes} from 'react'

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

    render = ({code, style} = this.props) =>
        <div
            style={m(s.root, style)}
            className="markdown markdown-body"
            dangerouslySetInnerHTML={this.rawMarkup()}></div>
}

const s = {
    root: {
        padding: 45
    }
}

export default MarkdownViewer