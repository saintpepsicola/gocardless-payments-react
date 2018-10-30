// Initial State
const initialState = {
    repos: [],
    isFetching: false,
    appTitle: '',
    readme: '',
    error: null
}

// Action constants
const GET_USER_REPOS = 'GET_USER_REPOS'
const GET_USER_REPOS_SUCCESS = 'GET_USER_REPOS_SUCCESS'
const GET_USER_REPOS_FAILURE = 'GET_USER_REPOS_FAILURE'
const SELECT_PROJECT = 'SELECT_PROJECT'
const GET_REPO_README = 'GET_REPO_README'
const GET_REPO_README_SUCCESS = 'GET_REPO_README_SUCCESS'
const GET_REPO_README_FAILURE = 'GET_REPO_README_FAILURE'

// Action creators
export const requestUserRepos = (user) => ({
    types: [GET_USER_REPOS, GET_USER_REPOS_SUCCESS, GET_USER_REPOS_FAILURE],
    payload: {
        request: {
            url: `/users/${user}/repos`
        }
    }
})
export const selectProject = (project) => ({
    type: SELECT_PROJECT,
    payload: project
})

export const requestReadme = (user, project) => {
    return ({
        types: [GET_REPO_README, GET_REPO_README_SUCCESS, GET_REPO_README_FAILURE],
        payload: {
            request: {
                url: `/repos/${user}/${project}/readme`,
                // Get README as HTML
                headers:
                {
                    'Accept': 'application/vnd.github.VERSION.html'
                }
            }
        }
    })
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REPOS:
            return {
                ...state,
                isFetching: true,
                repos: [],
                error: null
            };
        case GET_USER_REPOS_SUCCESS:
            return {
                ...state,
                repos: action.payload.data,
                appTitle: action.payload.data[0] ? `${action.payload.data[0].owner.login}'s projects` : null,
                isFetching: false
            };
        case GET_USER_REPOS_FAILURE:
            return {
                ...state,
                error: action.error.response.statusText,
                isFetching: false
            };
        case SELECT_PROJECT:
            return {
                ...state,
                appTitle: action.payload
            };
        case GET_REPO_README:
            return {
                ...state,
                isFetching: true,
                readme: '',
                error: null
            };
        case GET_REPO_README_SUCCESS:
            return {
                ...state,
                isFetching: false,
                readme: action.payload.data
            };
        case GET_REPO_README_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.response.statusText
            };
        default:
            return state
    }
}