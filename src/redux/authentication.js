const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID

// Initial State
const initialState = {
    // Check if Auth Token exists!
    authenticated: checkforAuthToken(),
    error: null,
    userName: localStorage[`user_name`] ? localStorage[`user_name`] : null,
    podName: localStorage[`healthera_pod_name`] ? localStorage[`healthera_pod_name`] : null,
    podID: localStorage[`healthera_pod_id`] ? localStorage[`healthera_pod_id`] : null,
    user: localStorage[`user`] ? JSON.parse(localStorage[`user`]) : { birthday: null, username: null },
    profilePage: false,
    team: []
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

const GET_TEAM_MEMBERS = `GET_TEAM_MEMBERS`
const GET_TEAM_MEMBERS_SUCCESS = `GET_TEAM_MEMBERS_SUCCESS`
const GET_TEAM_MEMBERS_FAILURE = `GET_TEAM_MEMBERS_FAILURE`

const SHOW_SUPPORT = `SHOW_SUPPORT`
const SHOW_PROFILE = `SHOW_PROFILE`
const CLOSE_PROFILE = `CLOSE_PROFILE`
const PASSWORD_RESET = `PASSWORD_RESET`
const PASSWORD_RESET_SUCCESS = `PASSWORD_RESET_SUCCESS`
const PASSWORD_RESET_FAILURE = `PASSWORD_RESET_FAILURE`

// Action creators
export const showSupportInfo = () => ({ type: SHOW_SUPPORT })
export const showProfile = () => ({ type: SHOW_PROFILE })
export const closeProfile = () => ({ type: CLOSE_PROFILE })

export const getTeamMembers = (podID) => {
    return ({
        types: [GET_TEAM_MEMBERS, GET_TEAM_MEMBERS_SUCCESS, GET_TEAM_MEMBERS_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/users`,
                headers: { ...headers, 'Token': localStorage[`healthera_pod_token`] }
            }
        }
    })
}

export const resetPassword = (email) => {
    return ({
        types: [PASSWORD_RESET, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE],
        payload: {
            request: {
                url: `/passwordreset`,
                method: 'POST',
                data: {
                    username: email
                },
                headers: headers
            }
        }
    })
}

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
        case SHOW_SUPPORT:
            alert('For Healthera support please call 01223 422018. We are open every Monday to Friday, from 9.30 AM to 6 PM.')
            return {
                ...state
            }
        case SHOW_PROFILE:
            return {
                ...state,
                profilePage: true
            }
        case CLOSE_PROFILE:
            return {
                ...state,
                profilePage: false
            }
        case GET_TEAM_MEMBERS:
            return {
                ...state
            }
        case GET_TEAM_MEMBERS_SUCCESS:
            return {
                ...state,
                team: action.payload.data.data
            }
        case GET_TEAM_MEMBERS_FAILURE:
            return {
                ...state
            }
        case PASSWORD_RESET:
            return {
                ...state,
                loginError: null
            }
        case PASSWORD_RESET_SUCCESS:
            if (!action.payload.data.error) {
                alert(action.payload.data.data[0].msg)
            }
            return {
                ...state,
                loginError: action.payload.data.error ? action.payload.data.error.text : null,
            }
        case PASSWORD_RESET_FAILURE:
            return {
                ...state
            }
        case LOGIN_USER:
            return {
                ...state
            }
        case LOGIN_USER_SUCCESS:
            let result = null
            if (!action.payload.data.error) {
                result = action.payload.data.data[0]
                if (result.user && result.pod) {
                    localStorage[`healthera_pod_token`] = result.token
                    localStorage[`healthera_pod_id`] = result.pod.pod_id
                    localStorage[`user_name`] = result.user.forename + ' ' + result.user.surname
                    localStorage[`user`] = JSON.stringify(result.user)
                    localStorage[`healthera_pod_name`] = result.pod.pod_name
                }
                else {
                    return {
                        ...state,
                        loginError: `You are not a POD user`,
                        authenticated: false
                    }
                }
            }
            return {
                ...state,
                loginError: action.payload.data.error ? action.payload.data.error.text : null,
                authenticated: action.payload.data.data ? true : false,
                userName: result ? result.user.forename + ' ' + result.user.surname : null,
                podName: result ? result.pod.pod_name : null,
                podID: result ? result.pod.pod_id : null,
                user: result ? result.user : null,
                profilePage: false
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state
            }
        case LOGOUT_USER:
            localStorage.removeItem(`healthera_pod_token`)
            return { ...state, authenticated: false }
        default:
            return state
    }
}
