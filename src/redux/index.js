import { combineReducers } from 'redux'
import githubSearch from './githubSearch'
import authentication from './authentication'

// Scale features with modules
export default combineReducers({
    githubSearch,
    authentication
})