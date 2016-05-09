import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

import languages from '~/utils/languages'
import m from '~/utils/m'

/**
 *  Infelizmente não conseguimos usar o ace seguindos princípios de imutabilidade do React.
 *  O ideal seria o editor ser readOnly e ser redesenhado através de um novo value e um onChange
 *  <CodeEditor value="novo value" onChange={this.changeValue} />
 *  Para isso, deveríamos fazer editor.setReadOnly(true) e invocar o onChange no evento onKeyUp do editor.
 *  Mas isso nos faz perder o suporte a Ctrl C, Ctrl V. Por isso, preferimos adotar a solução mais simples, que é
 *  deixar o ace se renderizar sozinho (shouldComponentUpdate retorna false sempre).
 */

const START_POSITION = -1

class CodeEditor extends Component {

    static defaultProps = {
        displayIndentGuides: true,
        highlightActiveLine: true,
        highlightGutterLine: true,
        maxLines: null,
        mode: '',
        readOnly: false,
        showFoldWidgets: true,
        value: ''
    }

    onChange = () => {
        if (this.props.onChange) {
            const value = this.editor.getValue();
            this.props.onChange(value);
        }
    }

    componentDidMount = () => {
        const {
            displayIndentGuides,
            highlightActiveLine,
            highlightGutterLine,
            maxLines,
            mode,
            readOnly,
            showFoldWidgets,
            value,
            onChange
            } = this.props


        this.editor = ace.edit(ReactDOM.findDOMNode(this))
        this.editor.$blockScrolling = Infinity
        this.editor.setTheme('ace/theme/chrome')

        this.editor.setReadOnly(readOnly)
        this.editor.setHighlightActiveLine(highlightActiveLine)
        this.editor.setHighlightGutterLine(highlightGutterLine)
        this.editor.setShowFoldWidgets(showFoldWidgets)
        //this.editor.container.style.lineHeight = 1.3
        this.editor.setOptions({maxLines: maxLines})

        onChange && this.editor.on('change', this.onChange)
        this.editor.setValue(value || '', START_POSITION)

        const {session, renderer} = this.editor

        session.setUseWorker(false)
        session.setMode(getMode(mode))

        renderer.setShowPrintMargin(false)
        renderer.setDisplayIndentGuides(displayIndentGuides)
        renderer.setPadding(10)

        window.editor = this.editor
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.editor.getValue() !== nextProps.value) {
            const currentRange = this.editor.selection.getRange()
            this.editor.setValue(nextProps.value || '')
            this.editor.session.getSelection().setSelectionRange(currentRange)
        }

        if (this.props.mode !== nextProps.mode) {
            this.editor.session.setMode(getMode(nextProps.mode))
        }
    }

    // O próprio ace se encarrega de se redesenhar
    shouldComponentUpdate = (nextProps, nextState) => false

    render = ({style} = this.props) =>
        <pre style={m(s.root, style)}/>
}

const s = {
    root: {
        border: 'none',
        borderRadius: 0,
        fontSize: 14,
        height: 250,
        margin: 0,
        width: '100%'
    }
}

const getMode = (fileType) => languages[fileType] && `ace/mode/${languages[fileType]}`

export default CodeEditor
