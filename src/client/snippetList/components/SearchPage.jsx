import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions  from '../actions'

import app from '../../app'
const { App, Container, PageInfo } = app.components

import EmptyResults from './EmptyResults'
import LanguagesPanel from './LanguagesPanel'
import ResultsPanel from './ResultsPanel'
import SearchBar from './SearchBar'


class SearchPage extends Component {

    componentDidMount() {
        this.props.search()
    }

    render() {
        const { query, totalResults } = this.props
        const { changeQuery, search } = this.props

        return (
            <App hideHeaderSearch>
                <PageInfo>
                    <SearchBar
                        query={query}
                        onChange={changeQuery}
                        onSearch={search}
                    />
                </PageInfo>

                <Container>
                    {totalResults == 0 ?
                        <EmptyResults query={query} /> :
                        <SearchResults {...this.props} />
                    }
                </Container>
            </App>
        )
    }
}


const SearchResults = (props) => {
    const {
        currentPage,
        languages,
        results,
        selectedLanguage,
        totalPages,
        totalResults,
        } = props

    const { search } = props

    return (
        <div className="row">
            <LanguagesPanel
                languages={languages}
                selectedLanguage={selectedLanguage}
            />

            <ResultsPanel
                currentPage={currentPage}
                results={results}
                totalResults={totalResults}
                totalPages={totalPages}
                onNavigation={(page) => search({page})}
            />
        </div>
    )
}


const mapStateToProps = (state) => {
    const { snippetList } = state
    return {
        currentPage: snippetList.currentPage,
        languages: snippetList.languages,
        query: snippetList.query,
        results: snippetList.results,
        selectedLanguage: snippetList.selectedLanguage,
        totalPages: snippetList.totalPages,
        totalResults: snippetList.totalResults
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeQuery(value) {
            dispatch(actions.changeQuery(value))
        },

        search(args = {}) {
            const { query, language, page } = ownProps.location.query

            dispatch(actions.search({
                query: args.query || query,
                language: args.language || language,
                page: args.page || page
            }))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage)