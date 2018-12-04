// We need to do this better later on
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REACT_APP_AUTH_URL = process.env.REACT_APP_AUTH_URL

// Initial State
const initialState = {
    // Check if Auth Token exists!
    authenticated: checkforAuthToken(),
    error: null,
    userName: localStorage[`user_name`],
    podName: localStorage[`healthera_pod_name`]
}

// Helpers
function checkforAuthToken() {
    let auth_token = localStorage[`healthera_pod_token`]
    return auth_token ? true : false
}

// Action constants
const REDIRECT_TO_AUTH = 'REDIRECT_TO_AUTH'
const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
const LOGOUT_USER = 'LOGOUT_USER'

// Action creators
export const redirectToAuth = () => ({ type: REDIRECT_TO_AUTH })
export const authenticate = (search, history) => ({ type: AUTHENTICATE_USER, payload: { search, history } })
export const logout = () => ({ type: LOGOUT_USER })

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case REDIRECT_TO_AUTH:
            const url = `${REACT_APP_AUTH_URL}/login?client_id=${REACT_APP_CLIENT_ID}`
            window.location = url
            return { ...state }
        case AUTHENTICATE_USER:
            const search = action.payload.search
            const queryParams = new URLSearchParams(search)
            const podID = queryParams.get('pod_id')
            const podName = queryParams.get('pod_name')
            const userName = queryParams.get('name')
            const token = queryParams.get('token')

            if (podID && token) {

                localStorage[`healthera_pod_token`] = token
                localStorage[`healthera_pod_id`] = podID

                // POD Details
                localStorage[`user_name`] = userName
                localStorage[`healthera_pod_name`] = podName

                action.payload.history.push('/')
                return { ...state, authenticated: true, podName, userName }
            }
            else {
                // Not a pod user - log them out
                const url = `${REACT_APP_AUTH_URL}/logout?client_id=${REACT_APP_CLIENT_ID}`
                window.location = url
                return { ...state, authenticated: false }
            }
        case LOGOUT_USER:
            localStorage.removeItem(`healthera_pod_token`)
            const authUrl = `${REACT_APP_AUTH_URL}/login?client_id=${REACT_APP_CLIENT_ID}`
            window.location = authUrl
            return { ...state, authenticated: false }
        default:
            return state
    }
}
