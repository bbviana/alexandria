import { combineReducers } from 'redux'
import app from './app'
import files from './files'
import loggedUser from './loggedUser'
import snippet from './snippet'
import snippets from './snippets'

const rootApp = combineReducers({
    app,
    files,
    loggedUser,
    snippet,
    snippets
})

export default rootApp