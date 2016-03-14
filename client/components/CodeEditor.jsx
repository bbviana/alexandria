import React, {Component, PropTypes} from 'react'

class CodeEditor extends Component {
    editor = {}

    componentDidMount = () => {
        console.log('componentDidMount')

        this.editor = ace.edit(this.refs.editor)
        this.editor.$blockScrolling = Infinity
        this.editor.setTheme("ace/theme/chrome")
        this.editor.renderer.setShowPrintMargin(false)
//      this.editor.renderer.setShowGutter(false)
        this.editor.renderer.setDisplayIndentGuides(false)
        this.editor.session.setMode("ace/mode/java")

        this.editor.on('change', e => this.props.onChange(this.editor.getValue()))

        //this.editor.setValue(this.props.value)
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        this.editor.setValue(nextProps.value)
    }

    render = ({value} = this.props) => {
        console.log('render')

        return (
            <div style={s.root}>
                <pre style={s.editor} ref="editor"/>
            </div>
        )
    }
}


const code = `public class InfiniteLoop {

    /*
     * This will cause the program to hang...
     *
     * Taken from:
     * http://www.exploringbinary.com/java-hangs-when-converting-2-2250738585072012e-308/
     */
    public static void main(String[] args) {
        double d = Double.parseDouble("2.2250738585072012e-308");

        // unreachable code
        System.out.println("Value: " + d);
    }
}`

const s = {
    root: {},
    editor: {
        border: 'none',
        borderRadius: 0,
        fontSize: 14,
        height: 250,
        width: '100%'
    }
}

export default CodeEditor
