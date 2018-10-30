import Cookies from 'universal-cookie'
import jwt_decode from 'jwt-decode'

// Initial State
const initialState = {
    authenticated: true,
    error: null
}

// Action constants
const IS_AUTHENTICATED = 'IS_AUTHENTICATED'
const REDIRECT_TO_AUTH = 'REDIRECT_TO_AUTH'
const AUTHENTICATE_USER = 'AUTHENTICATE_USER'

// Action creators
export const isAuthenticated = () => ({ type: IS_AUTHENTICATED })
export const redirectToAuth = () => ({ type: REDIRECT_TO_AUTH })
export const authenticate = (search, history) => ({ type: AUTHENTICATE_USER, payload: { search, history } })

// Consts
const cookies = new Cookies()

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTHENTICATED:
            console.log('Checking auth')
            let auth_token = cookies.get('podToken-189247ca-76de-45c8-8d29-de3f4d8ff360')
            console.log('TOKEN: ', auth_token)
            return {
                ...state,
                authenticated: auth_token ? true : false,
                token: auth_token
            }
        case REDIRECT_TO_AUTH:
            console.log('Redirecting for auth')
            const url = `${process.env.REACT_APP_AUTH_URL}/login?client_id=${process.env.REACT_APP_CLIENT_ID}`
            window.location = url
            return {
                ...state
            }
        case AUTHENTICATE_USER:
            const search = action.payload.search
            const queryParams = new URLSearchParams(search)
            let token = queryParams.get('token')
            var expires = new Date(jwt_decode(token).exp * 1000)
            cookies.set('podToken-189247ca-76de-45c8-8d29-de3f4d8ff360', token, { path: '/', expires: expires })
            action.payload.history.push('/')
            return {
                ...state,
                authenticated: true
            }
        default:
            return state
    }
}
