import Cookies from 'universal-cookie'
import jwt_decode from 'jwt-decode'

// We need to do this better later on
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REACT_APP_AUTH_URL = process.env.REACT_APP_AUTH_URL

// Consts
const cookies = new Cookies()

// Initial State
const initialState = {
    // Check if Auth Token exists!
    authenticated: false,
    error: null
}

// Helpers
function checkforAuthToken() {
    let auth_token = cookies.get(`healthera_pod_token222`)
    return auth_token ? true : false
}


// Action constants
const REDIRECT_TO_AUTH = 'REDIRECT_TO_AUTH'
const AUTHENTICATE_USER = 'AUTHENTICATE_USER'

// Action creators
export const redirectToAuth = () => ({ type: REDIRECT_TO_AUTH })
export const authenticate = (search, history) => ({ type: AUTHENTICATE_USER, payload: { search, history } })

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
            const token = queryParams.get('token')
            console.log(podID)
            if (podID && token) {
                // const expires = new Date(jwt_decode(token).exp * 1000)
                // cookies.set(`healthera_pod_token`, token, { path: '/', expires: expires })
                // cookies.set(`healthera_pod_id`, podID, { path: '/', expires: expires })
                // action.payload.history.push('/')
                // return { ...state, authenticated: true }
            }
            else {
                // Not a pod user - log them out 
                // const url = `${REACT_APP_AUTH_URL}/logout?client_id=${REACT_APP_CLIENT_ID}`
                // window.location = url
                // return { ...state, authenticated: false }
            }
        default:
            return state
    }
}
