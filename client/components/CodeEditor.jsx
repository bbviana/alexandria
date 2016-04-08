import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {m} from '../helpers'


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
        showFoldWidgets: true
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

const getMode = function (string) {
    if (LANGUAGES[string]) {
        return `ace/mode/${LANGUAGES[string]}`
    }

    return null
}

const LANGUAGES = {
    abap: "abap",
    abc: "abc",
    as: "actionscript",
    ada: "ada",
    apache_conf: "apache_conf",
    applescript: "applescript",
    asciidoc: "asciidoc",
    assembly_x86: "assembly_x86",
    autohotkey: "autohotkey",
    batchfile: "batchfile",
    c9search: "c9search",
    c_cpp: "c_cpp",
    cirru: "cirru",
    clj: "clojure",
    cobol: "cobol",
    coffee: "coffee",
    coldfusion: "coldfusion",
    cs: "csharp",
    css: "css",
    curly: "curly",
    d: "d",
    dart: "dart",
    diff: "diff",
    django: "django",
    dockerfile: "dockerfile",
    dot: "dot",
    eiffel: "eiffel",
    ejs: "ejs",
    elixir: "elixir",
    elm: "elm",
    erl: "erlang",
    forth: "forth",
    fortran: "fortran",
    ftl: "ftl",
    gcode: "gcode",
    gherkin: "gherkin",
    gitignore: "gitignore",
    glsl: "glsl",
    gobstones: "gobstones",
    golang: "golang",
    groovy: "groovy",
    haml: "haml",
    handlebars: "handlebars",
    haskell: "haskell",
    haxe: "haxe",
    html: "html",
    html_elixir: "html_elixir",
    html_ruby: "html_ruby",
    ini: "ini",
    io: "io",
    jack: "jack",
    jade: "jade",
    java: "java",
    js: "javascript",
    json: "json",
    jsoniq: "jsoniq",
    jsp: "jsp",
    jsx: "jsx",
    julia: "julia",
    latex: "latex",
    lean: "lean",
    less: "less",
    liquid: "liquid",
    lisp: "lisp",
    live_script: "live_script",
    livescript: "livescript",
    logiql: "logiql",
    lsl: "lsl",
    lua: "lua",
    luapage: "luapage",
    lucene: "lucene",
    makefile: "makefile",
    md: "markdown",
    mask: "mask",
    matlab: "matlab",
    mavens_mate_log: "mavens_mate_log",
    maze: "maze",
    mel: "mel",
    mips_assembler: "mips_assembler",
    mipsassembler: "mipsassembler",
    mushcode: "mushcode",
    mysql: "mysql",
    nix: "nix",
    nsis: "nsis",
    objectivec: "objectivec",
    ocaml: "ocaml",
    pascal: "pascal",
    perl: "perl",
    pgsql: "pgsql",
    php: "php",
    plain_text: "plain_text",
    powershell: "powershell",
    praat: "praat",
    prolog: "prolog",
    properties: "properties",
    protobuf: "protobuf",
    py: "python",
    r: "r",
    razor: "razor",
    rdoc: "rdoc",
    rhtml: "rhtml",
    rst: "rst",
    rb: "ruby",
    rust: "rust",
    sass: "sass",
    scad: "scad",
    scala: "scala",
    scheme: "scheme",
    scss: "scss",
    sh: "sh",
    sjs: "sjs",
    smarty: "smarty",
    snippets: "snippets",
    soy_template: "soy_template",
    space: "space",
    sql: "sql",
    sqlserver: "sqlserver",
    stylus: "stylus",
    svg: "svg",
    swift: "swift",
    swig: "swig",
    tcl: "tcl",
    tex: "tex",
    txt: "text",
    textile: "textile",
    toml: "toml",
    twig: "twig",
    ts: "typescript",
    vala: "vala",
    vbs: "vbscript",
    vm: "velocity",
    verilog: "verilog",
    vhdl: "vhdl",
    wollok: "wollok",
    xml: "xml",
    xquery: "xquery",
    yaml: "yaml"
}

export default CodeEditor
