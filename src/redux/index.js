import { combineReducers } from 'redux'
import githubSearch from './githubSearch'
import authentication from './authentication'
import userInterface from './userInterface'
import repeats from './repeats'
import search from './search'

// Scale features with modules
export default combineReducers({
    githubSearch,
    authentication,
    userInterface,
    repeats,
    search
})