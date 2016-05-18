import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

import * as actions  from '../actions'

import app from '../../app'
const { App, Container, PageInfo } = app.components

import snippet from '../../snippet'
const { Preview } = snippet.components

import NavBar from './NavBar'
import ProfileAvatar from './ProfileAvatar'
import ResultsPanel from './ResultsPanel'
import YourSnippetsTitle from './YourSnippetsTitle'

class UserStarredPage extends Component {

    componentDidMount() {
        this.props.load()
    }

    render() {
        const { loggedUser, results, user } = this.props

        const isMyOwnSnippets = loggedUser.login == user.login

        return (
            <App>
                <PageInfo>
                    {isMyOwnSnippets ?
                        <YourSnippetsTitle /> :
                        <ProfileAvatar user={user} />
                    }

                    <NavBar selected="starred"/>
                </PageInfo>

                <Container>
                    <div style={s}>
                        {results.map((result, i) =>
                            <Preview snippet={result} key={result._id} />
                        )}
                    </div>
                </Container>
            </App>
        )
    }
}


const s = {}

const mapStateToProps = (state) => {
    const { loggedUser, snippetList } = state

    return {
        loggedUser,
        results: snippetList.results,
        user: snippetList.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        load() {
            dispatch(actions.loadUserSnippets(ownProps.params.user))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserStarredPage)