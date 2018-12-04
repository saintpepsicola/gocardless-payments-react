//GLOBALS
// Initial State
let initialState = {
    repeats: [],
    error: null,
    fetching: false,
    repeatsFilter: 1,
    totalCount: null,
    rowsPerPage: 10,
    page: 0,
    repeatHistory: [],
    searchField: false
}

// Don't remove this until it's our LAST COMMIT
if (process.env.NODE_ENV !== 'production') {
    let hctoken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6IjFlZmQyZDIwLWY2ZjEtMTFlOC1iNjJmLWU5YTEyNjBlMzYxYSIsImV4cCI6MTU1MjQ3NzYxMCwiaWF0IjoxNTQzODM3NjEwLCJ1c2VyX2lkIjoiMzE0MDdjZDAtN2I5YS0xMWU4LWExZTYtYzI3YTEzODYwMDRmIn0.C9GfyDE6WvWMvMWSw7I5To92CsQmBlfPYHCBpPkb9_I`
    let hcpodid = `2c0a7fc0-8c09-11e8-9ff3-cb58e7e51351`
    localStorage[`healthera_pod_token`] = hctoken
    localStorage[`healthera_pod_id`] = hcpodid
}

let podID = localStorage[`healthera_pod_id`]
let token = localStorage[`healthera_pod_token`]
const clientID = process.env.REACT_APP_CLIENT_ID

let headers = {
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

// Update GP Status Repeat
const UPDATE_GP_STATUS = 'UPDATE_GP_STATUS'
const UPDATE_GP_STATUS_SUCCESS = 'UPDATE_GP_STATUS_SUCCESS'
const UPDATE_GP_STATUS_FAILURE = 'UPDATE_GP_STATUS_FAILURE'

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

// Toggle Searchbar
const TOGGLE_SEARCH = 'TOGGLE_SEARCH'

// Handle Tab Change
const CHANGE_TAB = 'CHANGE_TAB'

// Pagination
const RESET_PAGE = 'RESET_PAGE'

// Repeat History
const GET_REPEAT_HISTORY = 'GET_REPEAT_HISTORY'
const GET_REPEAT_HISTORY_SUCCESS = 'GET_REPEAT_HISTORY_SUCCESS'
const GET_REPEAT_HISTORY_FAILURE = 'GET_REPEAT_HISTORY_FAILURE'

// Action creators
export const resetPagination = (page = 0) => {
    return { type: RESET_PAGE, payload: { page } }
}

export const updateGPStatus = (repeatID, gpStatus) => {
    return {
        types: [UPDATE_GP_STATUS, UPDATE_GP_STATUS_SUCCESS, UPDATE_GP_STATUS_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/repeats/${repeatID}`,
                method: 'PUT',
                data: { gp_status: gpStatus },
                headers: headers
            }
        }
    }
}

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

export const toggleRepeats = (id) => {
    return ({
        type: TOGGLE_REPEATS,
        payload: { id }
    })
}

export const toggleSearch = (state) => {
    return ({
        type: TOGGLE_SEARCH,
        payload: { state }
    })
}

export const changeTab = (value) => {
    return ({
        type: CHANGE_TAB,
        payload: { value }
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

export const getRepeats = (active, pageSize = 10, page = 0) => {
    podID = localStorage[`healthera_pod_id`]
    token = localStorage['healthera_pod_token']
    headers.Token = token
    return ({
        types: [GET_REPEATS, GET_REPEATS_SUCCESS, GET_REPEATS_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/repeats?is_active=${active}&page=${page + 1}&page_size=${pageSize}`,
                headers: headers
            }
        }
    })
}


export const searchRepeats = (name) => {
    return ({
        types: [SEARCH_REPEATS, SEARCH_REPEATS_SUCCESS, SEARCH_REPEATS_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/patients/search`,
                method: 'POST',
                data: { name: name },
                headers: headers
            }
        }
    })
}

export const getRepeatHistory = (podID, patientID) => {
    return ({
        types: [GET_REPEAT_HISTORY, GET_REPEAT_HISTORY_SUCCESS, GET_REPEAT_HISTORY_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/patients/${patientID}/repeats?showRemedies=true`,
                headers: headers
            }
        }
    })
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TAB:
            return {
                ...state, repeatsFilter: action.payload.value, searchField: action.payload.value === 0 ? true : false, repeats: action.payload.value === 0 ? [] : state.repeats
            }
        case TOGGLE_SEARCH:
            return {
                ...state, searchField: action.payload.state
            }
        case GET_REPEAT_HISTORY:
            return {
                ...state
            }
        case GET_REPEAT_HISTORY_SUCCESS:
            return {
                ...state,
                repeatHistory: action.payload.data.data.filter(repeat => repeat.gp_status !== 'delivered').slice(0, 5)
            }
        case GET_REPEAT_HISTORY_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case RESET_PAGE:
            return {
                ...state, page: action.payload.page
            }
        case TOGGLE_REPEATS:
            return {
                ...state, repeatsFilter: action.payload.id
            }
        case UPDATE_GP_STATUS:
            return {
                ...state
            }
        case UPDATE_GP_STATUS_SUCCESS:
            return {
                ...state
            }
        case UPDATE_GP_STATUS_FAILURE:
            return {
                ...state
            }
        case SEND_NOTE:
            return {
                ...state
            }
        case SEND_NOTE_SUCCESS:
            return {
                ...state
            }
        case SEND_NOTE_FAILURE:
            return {
                ...state
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
                ...state
            }
        case TOGGLE_MEDICATION_SUCCESS:
            let returnedRemedy = action.payload.data.data[0]
            state.selectedRepeat.remedies.filter(remedy => remedy.remedy_id === returnedRemedy.remedy_id)[0].approved = returnedRemedy.approved
            return {
                ...state,
                selectedRepeat: { ...state.selectedRepeat }
            }
        case TOGGLE_MEDICATION_FAILURE:
            return {
                ...state
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
                repeats: action.payload.data.data,
                totalCount: action.payload.data.pagination.total_count,
                rowsPerPage: action.payload.data.pagination.page_size,
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
                repeats: []
            }
        case GET_REPEATS_SUCCESS:
            return {
                ...state,
                repeats: action.payload.data.data,
                totalCount: action.payload.data.pagination.total_count,
                rowsPerPage: initialState.rowsPerPage
            }
        case GET_REPEATS_FAILURE:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}
