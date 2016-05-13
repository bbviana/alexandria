import { combineReducers } from 'redux'

import files from './files'
import loading from './loading'
import loggedUser from './loggedUser'
import message from './message'
import snippet from './snippet'
import snippetList from './snippetList'


/**
 * {
 *      loading: Boolean,
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
 *      snippetList: {
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
const rootReducer = combineReducers({
    files: files.reducer,
    loading: loading.reducer,
    loggedUser: loggedUser.reducer,
    message: message.reducer,
    snippet: snippet.reducer,
    snippetList: snippetList.reducer
})

export default rootReducer

