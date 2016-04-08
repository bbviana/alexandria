import React, {Component, PropTypes} from 'react'
import s from '../styles/Search'
import {AppStore} from '../stores'
import {Button, CodeEditor, Icon} from '../components'
import {App, Container, Info, PageHeader} from './'
import {connect, m, styles} from '../helpers'
import Arrays from '../helpers/Arrays'
import Events from '../helpers/Events'

class Search extends Component {

    componentDidMount = () => {
        const query = this.props.location.query
        AppStore.search({query: query.query, language: query.language, page: query.page})
    }

    render = () => {
        const {
            currentPage,
            languages,
            query,
            results,
            selectedLanguage,
            totalPages,
            totalResults
            }= this.props

        return (
            <App hideHeaderSearch={true}>
                <PageHeader>
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
                </PageHeader>

                <Container>
                    <div className="row">
                        <LanguagesPanel languages={languages} selectedLanguage={selectedLanguage}/>

                        <ResultsPanel
                            currentPage={currentPage}
                            results={results}
                            totalResults={totalResults}
                            totalPages={totalPages}
                        />
                    </div>
                </Container>
            </App>
        )
    }
}


// Languages

const LanguagesPanel = ({languages, selectedLanguage}) =>
    <div style={s.languagesPanel} className="col-md-3">
        <h4 style={s.languagesTitle}>
            Linguagens
        </h4>

        <div style={s.languages}>
            {languages.map(language =>
                <Language
                    language={language}
                    selected={language.name == selectedLanguage}
                    key={language.name}/>
            )}
        </div>
    </div>


class Language extends Component {
    render = ({language, selected} = this.props) => {
        let href = `/search?&query=.`

        if (!selected) {
            href += `&language=${language.name}`
        }

        return (
            <a style={styles(s.language, {selected})} href={href}>
                <span style={m(s.bar, {width: language.percent + "%"})}/>

                <span>
                    {language.name}
                </span>

                <span style={s.languageTotal}>
                    {selected ?
                        <Icon name="times"/> :
                        language.count
                    }
                </span>
            </a>
        )
    }
}

// Results

const ResultsPanel = ({currentPage, results, totalPages, totalResults}) =>
    <div style={s.resultsPanel} className="col-md-9">
        <h4 style={s.resultsMessage}>
            Encontramos {totalResults} snippet{totalResults > 1 && 's'}
        </h4>

        {results.map(result =>
            <Snippet value={result} key={result._id}/>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages}/>
    </div>


const Snippet = ({value}) =>
    <div style={s.snippet}>
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
        <div style={s.description}>{value.description}</div>

        {value.files[0] &&
        <CodeExample snippetId={value._id} file={value.files[0]}/>}
    </div>


const InfoCountLinks = ({snippet}) =>
    <div style={s.infoCountLinks}>
        <a style={s.countLink} href={"/view/" + snippet._id}>
            <Icon name="file-code-o"/> {snippet.files.length} arquivo{snippet.files.length > 1 && 's'}
        </a>
    </div>


class CodeExample extends Component {
    state = {
        hover: false
    }

    handleMouseOut = () => this.setState({hover: false})
    handleMouseOver = () => this.setState({hover: true})

    render = ({file, snippetId} = this.props) =>
        <div
            style={styles(s.codeExample, this.state)}
            onMouseOut={this.handleMouseOut}
            onMouseOver={this.handleMouseOver}>

            <a style={s.codeExampleLink} href={"/view/" + snippetId}>
                {this.state.hover &&
                <span style={s.codeExampleLinkMessage}>
                    Ver <strong>{file.name}</strong>
                </span>
                }
            </a>

            <CodeEditor
                displayIndentGuides={false}
                maxLines={10}
                mode={file.type}
                highlightActiveLine={false}
                highlightGutterLine={false}
                readOnly={true}
                showFoldWidgets={false}
                value={file.content}/>
        </div>
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