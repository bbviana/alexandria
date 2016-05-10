import { combineReducers } from 'redux'

import files from './files'
import loggedUser from './loggedUser'
import message from './message'
import snippet from './snippet'
import snippets from './snippets'

import isFetching from './isFetching'

/**
 * {
 *      isFetching: Boolean,
 *
 *      loggedUser: {
 *          login: String,
 *          avatar: String
 *      },
 *
 *      message: String,
 *
 *      snippet: {
 *          _id: String,
 *          created: Date,
 *          description: String,
 *          user: Object
 *      },
 *
 *      files: [{
 *          name: String,
 *          content: String,
 *          type: String
 *      }],
 *
 *      snippets: {
 *          currentPage: Number,
 *          languages: [???],
 *          query: String,
 *          results: [Object],
 *          selectedLanguage: String,
 *          totalPages: Number,
 *          totalResults: Number
 *      }
 * }
 */
const rootApp = combineReducers({
    fetchData,
    files,
    loggedUser,
    message,
    snippet,
    snippets

})

export default rootApp

