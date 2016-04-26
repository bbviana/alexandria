import React, {Component, PropTypes} from 'react'

import highlight from 'highlight.js'
import marked from 'marked'


class MarkdownViewer extends Component {

    componentDidMount() {
        marked.setOptions({
            highlight: function (code) {
                return highlight.highlightAuto(code).value;
            }
        })
    }

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
    root: {}
}

export default MarkdownViewer