import { combineReducers } from 'redux'

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
 *          files: [{
 *              name: String,
 *              content: String,
 *              type: String
 *          }],
 *          user: Object
 *      },
 *
 *      snippetList: {
 *          currentPage: Number,
 *          languages: [???],
 *          query: String,
 *          results: [Object],
 *          selectedLanguage: String,
 *          totalPages: Number,
 *          totalResults: Number,
 *          user: Object
 *      }
 * }
 */
const rootReducer = combineReducers({
    loading: loading.reducer,
    loggedUser: loggedUser.reducer,
    message: message.reducer,
    snippet: snippet.reducer,
    snippetList: snippetList.reducer
})

export default rootReducer

