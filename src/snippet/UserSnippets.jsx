import React, {Component, PropTypes} from 'react'

const s = {}

class UserSnippets extends Component {

    componentDidMount() {

    }

    render = () =>
        <div style={s.root}>
            UserSnippets
        </div>
}

const mapStateToProps = state => ({
    currentPage: state.currentPage,
    results: state.results,
    totalPages: state.totalPages
})

export default UserSnippets