import Cookies from 'universal-cookie'
import jwt_decode from 'jwt-decode'

//Flow
const REACT_APP_AUTH_TOKEN: string = process.env.REACT_APP_AUTH_TOKEN != null
  ? process.env.REACT_APP_AUTH_TOKEN
  : ''

const REACT_APP_CLIENT_ID: string = process.env.REACT_APP_CLIENT_ID != null
  ? process.env.REACT_APP_CLIENT_ID
  : ''

const REACT_APP_AUTH_URL: string = process.env.REACT_APP_AUTH_URL != null
  ? process.env.REACT_APP_AUTH_URL
  : '' 

// Consts
const cookies = new Cookies()

// Initial State
const initialState = {
    // Check if Auth Token exists!
    authenticated: checkforAuthToken(),
    error: null
}
 
// Action constants
const REDIRECT_TO_AUTH = 'REDIRECT_TO_AUTH'
const AUTHENTICATE_USER = 'AUTHENTICATE_USER' 

// Action creators
export const redirectToAuth = () => ({ type: REDIRECT_TO_AUTH })
export const authenticate = (search, history) => ({ type: AUTHENTICATE_USER, payload: { search, history } })

// Helpers
function checkforAuthToken() {
    let auth_token = cookies.get(`${REACT_APP_AUTH_TOKEN}`)
    return auth_token ? true : false
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case REDIRECT_TO_AUTH:
            console.log('Redirecting for auth')
            const url = `${REACT_APP_AUTH_URL}/login?client_id=${REACT_APP_CLIENT_ID}`
            window.location = url
            return {
                ...state
            }
        case AUTHENTICATE_USER:
            const search = action.payload.search
            const queryParams = new URLSearchParams(search)
            let token = queryParams.get('token')
            var expires = new Date(jwt_decode(token).exp * 1000)
            cookies.set(`${REACT_APP_AUTH_TOKEN}`, token, { path: '/', expires: expires })
            action.payload.history.push('/')
            return {
                ...state,
                authenticated: true
            }
        default: 
            return state
    }
}
