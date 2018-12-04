import { combineReducers } from 'redux'
import authentication from './authentication'
import userInterface from './userInterface'
import repeats from './repeats'

// Scale features with modules
export default combineReducers({
    authentication,
    userInterface,
    repeats
})