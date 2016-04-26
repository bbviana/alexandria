import React, {Component, PropTypes} from 'react'

import highlight from 'highlight.js'
import marked from 'marked'

marked.setOptions({
    highlight: code => highlight.highlightAuto(code).value
})

class MarkdownViewer extends Component {

    rawMarkup = () => {
        var rawMarkup = marked(this.props.code)
        return {__html: rawMarkup};
    }

    render = () =>
        <div
            style={s.root}
            className="markdown"
            dangerouslySetInnerHTML={this.rawMarkup()}></div>
}

const s = {
    root: {
        padding: 45
    }
}

export default MarkdownViewer