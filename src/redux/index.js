import { combineReducers } from 'redux'
import githubSearch from './githubSearch'

// We only have one module at the moment but as our app grows in features 
// we'll need more! Adding the ability to combine multiple modules for future scalability.
export default combineReducers({
    githubSearch
})