// We need to do this better later on
const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID

// Initial State
const initialState = {
    // Check if Auth Token exists!
    authenticated: checkforAuthToken(),
    error: null,
    userName: localStorage[`user_name`],
    podName: localStorage[`healthera_pod_name`]
}

let headers = {
    'crossDomain': true,
    'client-id': REACT_APP_CLIENT_ID
}

// Helpers
function checkforAuthToken() {
    let auth_token = localStorage[`healthera_pod_token`]
    return auth_token ? true : false
}

// Action constants
const LOGOUT_USER = 'LOGOUT_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGIN_USER_SUCCESS = `LOGIN_USER_SUCCESS`
const LOGIN_USER_FAILURE = `LOGIN_USER_FAILURE`

// Action creators
export const logout = () => ({ type: LOGOUT_USER })

export const login = (email, password) => {
    return ({
        types: [LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE],
        payload: {
            request: {
                url: `/tokens`,
                method: 'POST',
                data: {
                    username: email,
                    user_password: password
                },
                headers: headers
            }
        }
    })
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state
            }
        case LOGIN_USER_SUCCESS:
            let result = null
            if (!action.payload.data.error) {
                result = action.payload.data.data[0]
                localStorage[`healthera_pod_token`] = result.token
                localStorage[`healthera_pod_id`] = result.pod.pod_id
                localStorage[`user_name`] = result.user.forename + ' ' + result.user.surname
                localStorage[`healthera_pod_name`] = result.pod.pod_name
            }
            return {
                ...state,
                loginError: action.payload.data.error ? action.payload.data.error.text : null,
                authenticated: action.payload.data.data ? true : false,
                userName: result ? result.user.forename + ' ' + result.user.surname : null,
                podName: result ? result.pod.pod_name : null
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state
            }
        case LOGOUT_USER:
            console.log(action)
            localStorage.removeItem(`healthera_pod_token`)
            return { ...state, authenticated: false }
        default:
            return state
    }
}
