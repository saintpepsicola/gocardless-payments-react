import { combineReducers } from 'redux'
import githubSearch from './githubSearch'
import authentication from './authentication'
import userInterface from './userInterface'

// Scale features with modules
export default combineReducers({
    githubSearch,
    authentication,
    userInterface
})