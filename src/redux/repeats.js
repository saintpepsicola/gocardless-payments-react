import Cookies from 'universal-cookie'

//GLOBALS
// Initial State
let initialState = {
    repeats: [],
    error: null,
    fetching: false,
    repeatsFilter: false
}

console.log('TOKEN: ' + new Cookies().get(`healthera_pod_token`))
console.log('POD_ID: ' + new Cookies().get(`healthera_pod_id`))


const podID = '2c0a7fc0-8c09-11e8-9ff3-cb58e7e51351'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6IjE3YTUzMTQwLWYxYTUtMTFlOC04ODJlLWNlOWI5NTNhY2Q3OSIsImV4cCI6MTU1MTg5NTIwMCwiaWF0IjoxNTQzMjU1MjAwLCJ1c2VyX2lkIjoiMzE0MDdjZDAtN2I5YS0xMWU4LWExZTYtYzI3YTEzODYwMDRmIn0.gHBO1xKTIWk1iNi4ElwtG1tijcV2xjlttH8jNsWuOQU'
const clientID = 'vAc51a1bc845457'

const headers = {
    'Token': token,
    'crossDomain': true,
    'client-id': clientID
}

// Action constants
// All Repeats
const GET_REPEATS = 'GET_REPEATS'
const GET_REPEATS_SUCCESS = 'GET_REPEATS_SUCCESS'
const GET_REPEATS_FAILURE = 'GET_REPEATS_FAILURE'

// Single Repeat
const GET_REPEAT = 'GET_REPEAT'
const GET_REPEAT_SUCCESS = 'GET_REPEAT_SUCCESS'
const GET_REPEAT_FAILURE = 'GET_REPEAT_FAILURE'

// Search by name
const SEARCH_REPEATS = 'SEARCH_REPEATS'
const SEARCH_REPEATS_SUCCESS = 'SEARCH_REPEATS_SUCCESS'
const SEARCH_REPEATS_FAILURE = 'SEARCH_REPEATS_FAILURE'

// Select a repeat
const SELECT_REPEAT = 'SELECT_REPEAT'

// Toggle Medication
const TOGGLE_MEDICATION = 'TOGGLE_MEDICATION'
const TOGGLE_MEDICATION_SUCCESS = 'TOGGLE_MEDICATION_SUCCESS'
const TOGGLE_MEDICATION_FAILURE = 'TOGGLE_MEDICATION_FAILURE'

// Get Repeat Notes
const GET_NOTES = 'GET_NOTES'
const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS'
const GET_NOTES_FAILURE = 'GET_NOTES_FAILURE'

// Send Repeat Notes
const SEND_NOTE = 'SEND_NOTE'
const SEND_NOTE_SUCCESS = 'SEND_NOTE_SUCCESS'
const SEND_NOTE_FAILURE = 'SEND_NOTE_FAILURE'

// Toggle Repeats filter : ACTIVE / INACTIVE
const TOGGLE_REPEATS = 'TOGGLE_REPEATS'

// Action creators
export const getNotes = (repeatID) => {
    return {
        types: [GET_NOTES, GET_NOTES_SUCCESS, GET_NOTES_FAILURE],
        payload: {
            request: {
                url: `/repeats/${repeatID}/comments`,
                headers: headers
            }
        }
    }
}

export const sendNote = (repeatID, message) => {
    return {
        types: [SEND_NOTE, SEND_NOTE_SUCCESS, SEND_NOTE_FAILURE],
        payload: {
            request: {
                url: `/repeats/${repeatID}/comments`,
                method: 'POST',
                data: { comment: message },
                headers: headers
            }
        }
    }
}

export const toggleMedication = (podID, repeatID, remedy) => {
    if (window.confirm("Are you sure?")) {
        return {
            types: [TOGGLE_MEDICATION, TOGGLE_MEDICATION_SUCCESS, TOGGLE_MEDICATION_FAILURE],
            payload: {
                request: {
                    url: `/pods/${podID}/repeats/${repeatID}/remedies/${remedy.remedy_id}`,
                    method: 'PUT',
                    data: { approved: !remedy.approved },
                    headers: headers
                }
            }
        }
    }
    return { type: 'NULL' }
}

export const toggleRepeats = (id) => {
    return ({
        type: TOGGLE_REPEATS,
        payload: { id }
    })
}

export const selectRepeat = (id) => {
    return ({
        type: SELECT_REPEAT,
        payload: { id }
    })
}

export const getRepeat = (repeatID) => {
    return ({
        types: [GET_REPEAT, GET_REPEAT_SUCCESS, GET_REPEAT_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/repeats/${repeatID}`,
                headers: headers
            }
        }
    })
}

export const getRepeats = () => {
    return ({
        types: [GET_REPEATS, GET_REPEATS_SUCCESS, GET_REPEATS_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/repeats?page=1&page_size=10`,
                headers: headers
            }
        }
    })
}

// Needs tweaking!
export const searchRepeats = (name) => {
    return ({
        types: [SEARCH_REPEATS, SEARCH_REPEATS_SUCCESS, SEARCH_REPEATS_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/patients/search`,
                method: 'POST',
                data: {
                    name: 'J',
                    lastName: 'Flintstone'
                },
                headers: headers
            }
        }
    })
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_REPEATS:
            return {
                ...state, repeatsFilter: action.payload.id
            }
        case SEND_NOTE:
            return {
                ...state, fetching: true
            }
        case SEND_NOTE_SUCCESS:
            return {
                ...state, fetching: false
            }
        case SEND_NOTE_FAILURE:
            return {
                ...state, fetching: false
            }
        case GET_NOTES:
            return {
                ...state
            }
        case GET_NOTES_SUCCESS:
            return {
                ...state, comments: action.payload.data.data
            }
        case GET_NOTES_FAILURE:
            return {
                ...state
            }
        case TOGGLE_MEDICATION:
            return {
                ...state,
                fetching: true
            }
        case TOGGLE_MEDICATION_SUCCESS:
            let returnedRemedy = action.payload.data.data[0]
            state.selectedRepeat.remedies.filter(remedy => remedy.remedy_id === returnedRemedy.remedy_id)[0].approved = returnedRemedy.approved
            return {
                ...state,
                fetching: false,
                selectedRepeat: { ...state.selectedRepeat }
            }
        case TOGGLE_MEDICATION_FAILURE:
            return {
                ...state,
                fetching: false
            }
        case SELECT_REPEAT:
            return {
                ...state,
                selectedRepeat: action.payload
            }
        case SEARCH_REPEATS:
            return {
                ...state,
                fetching: true
            }
        case SEARCH_REPEATS_SUCCESS:
            return {
                ...state,
                fetching: false
            }
        case SEARCH_REPEATS_FAILURE:
            return {
                ...state,
                error: action.error,
                fetching: false
            }
        case GET_REPEAT:
            return {
                ...state,
                selectedRepeat: null,
                fetching: true
            }
        case GET_REPEAT_SUCCESS:
            return {
                ...state,
                fetching: false,
                selectedRepeat: action.payload.data.data[0]
            }
        case GET_REPEAT_FAILURE:
            return {
                ...state,
                error: action.error,
                fetching: false
            }
        case GET_REPEATS:
            return {
                ...state,
                repeats: [],
                fetching: true
            }
        case GET_REPEATS_SUCCESS:
            return {
                ...state,
                fetching: false,
                repeats: action.payload.data.data
            }
        case GET_REPEATS_FAILURE:
            return {
                ...state,
                error: action.error,
                fetching: false
            }
        default:
            return state
    }
}
