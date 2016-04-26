//region Imports
import React, {Component, PropTypes} from 'react'

import AppStore from '~/app/AppStore'

import Button from '~/app/components/Button'
import CodeEditor from '~/app/components/CodeEditor'
import Icon from '~/app/components/Icon'

import Arrays from '~/app/helpers/Arrays'
import Events from '~/app/helpers/Events'
import Strings from '~/app/helpers/Strings'
import connect from '~/app/helpers/connect'
import languages from '~/app/helpers/languages'
import m from '~/app/helpers/m'
import styles from '~/app/helpers/styles'

import App from '~/app/layouts/App'
import Container from '~/app/layouts/Container'
import PageHeader from '~/app/layouts/PageHeader'

import Info from './Info'
//endregion

const s = {}

class Search extends Component {

    componentDidMount = () => {
        const query = this.props.location.query
        AppStore.search({query: query.query, language: query.language, page: query.page})
    }

    render = ({query, totalResults} = this.props) => {
        return (
            <App hideHeaderSearch={true}>
                <PageHeader>
                    <SearchBar query={query}/>
                </PageHeader>

                <Container>
                    {totalResults == 0 ?
                        <EmptySearch query={query}/> :
                        <SearchResult {...this.props}/>
                    }
                </Container>
            </App>
        )
    }
}

const SearchBar = ({query}) =>
    <div className="row">
        <div className="col-md-2">
            Buscar
        </div>
        <div className="col-md-9">
            <input
                className="form-control"
                autoFocus
                value={query}
                type="text"
                onChange={e => AppStore.changeQuery(e.target.value)}
                onKeyUp={e => Events.handleEnterKey(e, () => AppStore.search({page: 1}))}
            />
        </div>
        <div className="col-md-1">
            <Button onClick={() => AppStore.search({page: 1})}>
                Buscar
            </Button>
        </div>
    </div>


const SearchResult = (props) =>
    <div className="row">
        <LanguagesPanel
            languages={props.languages}
            selectedLanguage={props.selectedLanguage}
        />

        <ResultsPanel
            currentPage={props.currentPage}
            results={props.results}
            totalResults={props.totalResults}
            totalPages={props.totalPages}
        />
    </div>


const EmptySearch = ({query}) =>
    <div style={s.emptySearch.root}>
        <Icon style={s.emptySearch.icon} name="search"/>
        <div style={s.emptySearch.text}>Não encontramos nenhum snippet com o termo '{query}'</div>
        <div>Para uma busca avançada, use alguns dos <a href="">prefixos</a></div>
    </div>

s.emptySearch = {
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


const LanguagesPanel = ({languages, selectedLanguage}) =>
    <div style={s.languagesPanel.root} className="col-md-3">
        <h4 style={s.languagesPanel.title}>
            Linguagens
        </h4>

        <div style={s.languagesPanel.languages}>
            {languages.map(language =>
                <Language
                    language={language}
                    selected={language.name == selectedLanguage}
                    key={language.name}
                />
            )}
        </div>
    </div>

s.languagesPanel = {
    root: {},

    languages: {
        color: '#767676'
    },

    title: {
        fontWeight: 'bold'
    }
}


class Language extends Component {
    state = {hover: false}

    handleMouseOut = () => this.setState({hover: false})
    handleMouseOver = () => this.setState({hover: true})

    render = ({hover} = this.state, {language, selected} = this.props) => {
        let href = `/search?&query=.`

        if (!selected) {
            href += `&language=${language.name}`
        }

        return (
            <a
                style={styles(s.language.root, {hover, selected})}
                href={href}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
            >
                <span style={m(s.language.bar, {width: language.percent + "%"})}/>

                <span>
                    {Strings.capitalize(languages[language.name])}
                </span>

                <span style={s.language.total}>
                    {selected ?
                        <Icon name="times"/> :
                        language.count
                    }
                </span>
            </a>
        )
    }
}

s.language = {
    root: {
        borderRadius: 3,
        color: 'inherit',
        display: 'block',
        fontSize: 12,
        marginBottom: 5,
        padding: '4px 10px',
        position: 'relative',
        textDecoration: 'inherit',

        hover: {
            backgroundColor: '#f1f1f1'
        },

        selected: {
            backgroundColor: '#4078c0',
            color: '#fff'
        }
    },

    bar: {
        background: '#f1f1f1',
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: -1
    },

    total: {
        fontWeight: 'bold',
        float: 'right'
    }
}


const ResultsPanel = ({currentPage, results, totalPages, totalResults}) =>
    <div style={s.resultsPanel.root} className="col-md-9">
        <h4 style={s.resultsPanel.message}>
            Encontramos {totalResults} snippet{totalResults > 1 && 's'}
        </h4>

        {results.map(result =>
            <Snippet value={result} key={result._id}/>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages}/>
    </div>

s.resultsPanel = {
    root: {},

    message: {
        borderBottom: '1px solid #f1f1f1',
        fontWeight: 'bold',
        marginBottom: 20,
        paddingBottom: 20
    }

}

const Snippet = ({value}) =>
    <div style={s.snippet.root}>
        <div>
            <Info
                created={value.created}
                file={value.files[0] && value.files[0].name}
                snippetId={value._id}
                updated={value.updated}
                user={value.user}
            />
            <InfoCountLinks snippet={value}/>
        </div>
        <div style={s.snippet.description}>
            {value.description}
        </div>

        {value.files[0] &&
        <CodeExample snippetId={value._id} file={value.files[0]}/>}
    </div>

s.snippet = {
    root: {},

    description: {
        color: '#767676',
        marginLeft: 38
    }
}

const InfoCountLinks = ({snippet}) =>
    <div style={s.infoCountLinks.root}>
        <a style={s.infoCountLinks.link} href={"/view/" + snippet._id}>
            <Icon name="file-code-o"/> {snippet.files.length} arquivo{snippet.files.length > 1 && 's'}
        </a>
    </div>


s.infoCountLinks = {
    root: {
        float: 'right'
    },

    link: {
        color: '#767676',
        fontSize: 14,
        fontWeight: 'bold'
    }
}

class CodeExample extends Component {
    state = {
        hover: false
    }

    handleMouseOut = () => this.setState({hover: false})
    handleMouseOver = () => this.setState({hover: true})

    render = ({file, snippetId} = this.props) =>
        <div
            style={styles(s.codeExample.root, this.state)}
            onMouseOut={this.handleMouseOut}
            onMouseOver={this.handleMouseOver}
        >
            <a style={s.codeExample.link} href={"/view/" + snippetId}>
                {this.state.hover &&
                <span style={s.codeExample.linkMessage}>
                    Ver <strong>{file.name}</strong>
                </span>}
            </a>

            <CodeEditor
                displayIndentGuides={false}
                maxLines={10}
                mode={file.type}
                highlightActiveLine={false}
                highlightGutterLine={false}
                readOnly={true}
                showFoldWidgets={false}
                value={file.content}
            />
        </div>
}

s.codeExample = {
    root: {
        border: '1px solid',
        borderColor: '#ddd',
        borderRadius: 3,
        marginBottom: 50,
        marginTop: 15,
        padding: 1, // para que a borda apareça
        position: 'relative',

        hover: {
            borderColor: '#4078c0'
        }
    },

    link: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 2
    },

    linkMessage: {
        backgroundColor: '#4078c0',
        color: '#fff',
        fontSize: 12,
        padding: '2px 8px',
        position: 'absolute',
        right: 0,
        top: 0
    }
}


const Pagination = ({currentPage, totalPages}) =>
    <nav style={s.pagination}>
        <ul className="pagination">
            <li className={currentPage == 1 && 'disabled'}>
                <a href="javascript: void(0)" onClick={() => AppStore.search({page: currentPage - 1})}>
                    <span>&laquo;</span>
                </a>
            </li>

            {Arrays.range(1, totalPages).map((page) =>
                <li className={page == currentPage && 'active'} key={page}>
                    <a href="javascript: void(0)" onClick={() => AppStore.search({page: page})}>
                        {page}
                    </a>
                </li>
            )}

            <li className={currentPage == totalPages && 'disabled'}>
                <a href="javascript: void(0)" onClick={() => AppStore.search({page: currentPage + 1})}>
                    <span>&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>

s.pagination = {
    textAlign: 'center'
}

// Connect Store

const mapStateToProps = state => ({
    currentPage: state.currentPage,
    languages: state.languages,
    query: state.query,
    results: state.results,
    selectedLanguage: state.selectedLanguage,
    totalPages: state.totalPages,
    totalResults: state.totalResults
})

export default connect(Search, AppStore, mapStateToProps)