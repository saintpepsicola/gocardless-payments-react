import firebase from 'firebase/app'
import 'firebase/database'

// // Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDz-VMKi5TU8I7Juwy5dFWVKH4yvigXF2c",
    databaseURL: "https://healthera-pod.firebaseio.com",
    projectId: "healthera-pod",
    storageBucket: "healthera-pod.appspot.com"
})

// Initialize Cloud Firestore through Firebase
let db = firebase.database()

// GLOBALS
// Initial State
let initialState = {
    repeats: [],
    error: null,
    fetching: false,
    showSearchFilters: false,
    showFilterIcon: true,
    repeatsFilter: 0,
    totalCount: null,
    rowsPerPage: 10,
    modalVisible: false,
    medicines: [],
    page: 0,
    repeatHistory: [],
    searchField: false,
    parentOrder: null,
    searchError: null,
    searchTerm: null
}

let podID = localStorage[`healthera_pod_id`]
let userName = localStorage[`user_name`]
let token = localStorage[`healthera_pod_token`]
let user = localStorage[`user`] ? JSON.parse(localStorage[`user`]) : null
const clientID = process.env.REACT_APP_CLIENT_ID

let headers = {
    'Token': token,
    'crossDomain': true,
    'client-id': clientID
}

// Action constants
// All Repeats
const TOGGLE_BLUR = 'TOGGLE_BLUR'
const GET_REPEATS = 'GET_REPEATS'
const GET_REPEATS_SUCCESS = 'GET_REPEATS_SUCCESS'
const GET_REPEATS_FAILURE = 'GET_REPEATS_FAILURE'
const GET_LOCKED_REPEATS_FROM_FIREBASE = 'GET_REPEATS_FROM_FIREBASE'

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

// Toggle Medication
const SAVE_MEDICATION = 'SAVE_MEDICATION'
const UPDATE_MEDICATION = 'UPDATE_MEDICATION'
const UPDATE_MEDICATION_SUCCESS = 'UPDATE_MEDICATION_SUCCESS'
const UPDATE_MEDICATION_FAILURE = 'UPDATE_MEDICATION_FAILURE'

// Get Repeat Notes
const GET_NOTES = 'GET_NOTES'
const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS'
const GET_NOTES_FAILURE = 'GET_NOTES_FAILURE'

//Storing Parent Order for Order History
const UPDATE_PARENT_ORDER = 'UPDATE_PARENT_ORDER'

// Send Repeat Notes
const SEND_NOTE = 'SEND_NOTE'
const SEND_NOTE_SUCCESS = 'SEND_NOTE_SUCCESS'
const SEND_NOTE_FAILURE = 'SEND_NOTE_FAILURE'

// Toggle Repeats filter : ACTIVE / INACTIVE
const TOGGLE_REPEATS = 'TOGGLE_REPEATS'

// Handle Tab Change
const CHANGE_TAB = 'CHANGE_TAB'

// Pagination
const RESET_PAGE = 'RESET_PAGE'

// Repeat History
const GET_REPEAT_HISTORY = 'GET_REPEAT_HISTORY'
const GET_REPEAT_HISTORY_SUCCESS = 'GET_REPEAT_HISTORY_SUCCESS'
const GET_REPEAT_HISTORY_FAILURE = 'GET_REPEAT_HISTORY_FAILURE'

//Locking Repeats
const LOCK_REPEAT = 'LOCK_REPEAT'
const UNLOCK_REPEAT = 'UNLOCK_REPEAT'

//Filtering by Surgeries
const GET_SURGERIES = 'GET_SURGERIES'
const GET_SURGERIES_SUCCESS = 'GET_SURGERIES_SUCCESS'
const GET_SURGERIES_FAILURE = 'GET_SURGERIES_FAILURE'
const SET_SURGERIES_FILTER = 'SET_SURGERIES_FILTER'
const TOGGLE_SEARCH_FILTER = 'TOGGLE_SEARCH_FILTER'
let surgeryFilter = null

export const toggleBlur = (value) => {
    return { type: TOGGLE_BLUR, payload: { value } }
}

export const toggleSearchFilter = () => {
    return { type: TOGGLE_SEARCH_FILTER }
}

export const setSurgeryFilter = (value) => {
    return { type: SET_SURGERIES_FILTER, payload: { value } }
}

export const getSurgeries = () => {
    return {
        types: [GET_SURGERIES, GET_SURGERIES_SUCCESS, GET_SURGERIES_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/`,
                headers: headers
            }
        }
    }
}

export const lockRepeat = (repeatID) => {
    return { type: LOCK_REPEAT, payload: { repeatID } }
}

export const unlockRepeat = (repeatID) => {
    return { type: `UNLOCK_REPEAT`, payload: { repeatID } }
}

export const resetPagination = (page = 0) => {
    return { type: RESET_PAGE, payload: { page } }
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

export const toggleRepeats = (id) => {
    return ({
        type: TOGGLE_REPEATS,
        payload: { id }
    })
}

export const changeTab = (value) => {
    return ({
        type: CHANGE_TAB,
        payload: { value }
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

export const updateParentOrder = (repeatID) => {
    return ({
        type: UPDATE_PARENT_ORDER,
        payload: { repeatID }
    })
}

export const saveMedications = (remedies) => {
    return ({
        type: SAVE_MEDICATION,
        payload: { remedies }
    })
}

export const updateMedications = (repeatID, remedies) => {
    return {
        types: [UPDATE_MEDICATION, UPDATE_MEDICATION_SUCCESS, UPDATE_MEDICATION_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/repeats/${repeatID}/remedies/`,
                method: 'PUT',
                data: { medicines: remedies },
                headers: headers
            }
        }
    }
}

export const updateGPStatus2 = (repeatID, gpStatus, rejectionReason) => {
    return {
        types: [UPDATE_GP_STATUS, UPDATE_GP_STATUS_SUCCESS, UPDATE_GP_STATUS_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/repeats/${repeatID}`,
                method: 'PUT',
                data: { gp_status: gpStatus, comment: rejectionReason },
                headers: headers
            }
        }
    }
}

export const updateGPStatus = (repeatID, gpStatus, remedies, rejectionReason) => {
    return dispatch => {
        Promise.all([dispatch(updateMedications(repeatID, remedies))]).then(() => {
            dispatch(updateGPStatus2(repeatID, gpStatus, rejectionReason))
        })
    }
}

export const getRepeatsfromAPI = (active, pageSize, page, sort) => {
    podID = localStorage[`healthera_pod_id`]
    token = localStorage[`healthera_pod_token`]
    userName = localStorage[`user_name`]
    user = JSON.parse(localStorage[`user`])
    db.ref('pods/' + podID + '/' + user.user_id).onDisconnect().remove()
    headers.Token = token
    return ({
        types: [GET_REPEATS, GET_REPEATS_SUCCESS, GET_REPEATS_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/repeats?is_active=${active}&page=${page + 1}&page_size=${pageSize}&sort=${sort}&${surgeryFilter}`,
                headers: headers
            }
        }
    })
}

export const getRepeats = (active, pageSize = 10, page = 0, sort = active ? 'date_created:asc' : 'date_created:desc') => {
    return dispatch => {
        Promise.all([
            dispatch(getRepeatsfromAPI(active, pageSize, page, sort))
        ]).then(() => {
            db.ref('pods/' + podID).on('value', function (snapshot) {
                dispatch({ type: GET_LOCKED_REPEATS_FROM_FIREBASE, payload: snapshot.val() })
            })
        })
    }
}

export const searchRepeats = (name, pageSize = 10, page = 0) => {
    return ({
        types: [SEARCH_REPEATS, SEARCH_REPEATS_SUCCESS, SEARCH_REPEATS_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/patients/search?page=${page + 1}&page_size=${pageSize}`,
                method: 'POST',
                data: { name: name },
                headers: headers
            }
        }
    })
}

export const getRepeatHistory = (podID, patientID, repeatID) => {
    return ({
        types: [GET_REPEAT_HISTORY, GET_REPEAT_HISTORY_SUCCESS, GET_REPEAT_HISTORY_FAILURE],
        payload: {
            request: {
                url: `/pods/${podID}/patients/${patientID}/repeats/${repeatID}?showRemedies=true`,
                headers: headers
            }
        }
    })
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_MEDICATION:
            return { ...state, medicines: action.payload.remedies }
        case UPDATE_PARENT_ORDER:
            return { ...state, parentOrder: action.payload.repeatID }
        case TOGGLE_BLUR:
            return { ...state, modalVisible: action.payload.value }
        case TOGGLE_SEARCH_FILTER:
            return { ...state, showSearchFilters: !state.showSearchFilters }
        case SET_SURGERIES_FILTER:
            surgeryFilter = action.payload.value
            return { ...state }
        case GET_SURGERIES:
            return { ...state, surgeries: [] }
        case GET_SURGERIES_SUCCESS:
            return { ...state, surgeries: action.payload.data.data[0].surgeries }
        case GET_SURGERIES_FAILURE:
            return { ...state, surgeries: [] }
        case CHANGE_TAB:
            surgeryFilter = null
            return {
                ...state, medicines: [], parentOrder: null, showFilterIcon: true, showSearchFilters: false, repeatsFilter: action.payload.value, searchError: null, searchTerm: null, searchField: action.payload.value === 2 ? true : false, repeats: action.payload.value === 2 ? [] : state.repeats
            }
        case GET_REPEAT_HISTORY:
            return { ...state }
        case GET_REPEAT_HISTORY_SUCCESS:
            return { ...state, repeatHistory: action.payload.data.data }
        case GET_REPEAT_HISTORY_FAILURE:
            return { ...state, error: action.error }
        case RESET_PAGE:
            return { ...state, page: action.payload.page }
        case TOGGLE_REPEATS:
            return { ...state, repeatsFilter: action.payload.id }
        case UPDATE_GP_STATUS:
            return { ...state }
        case UPDATE_GP_STATUS_SUCCESS:
            return { ...state }
        case UPDATE_GP_STATUS_FAILURE:
            return { ...state }
        case SEND_NOTE:
            return { ...state }
        case SEND_NOTE_SUCCESS:
            return { ...state }
        case SEND_NOTE_FAILURE:
            return { ...state }
        case GET_NOTES:
            return { ...state }
        case GET_NOTES_SUCCESS:
            return { ...state, comments: action.payload.data.data }
        case GET_NOTES_FAILURE:
            return { ...state }
        case SEARCH_REPEATS:
            return {
                ...state,
                fetching: true,
                searchError: null,
                searchTerm: action.payload.request.data.name
            }
        case SEARCH_REPEATS_SUCCESS:
            return {
                ...state,
                repeats: action.payload.data.data,
                searchError: action.payload.data.data.length === 0 ? 'No Results found' : null,
                searchTerm: action.payload.data.pagination.search_term,
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
                showFilterIcon: false,
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
        case UNLOCK_REPEAT:
            setTimeout(() => {
                db.ref('pods/' + podID + '/' + user.user_id).remove()
            }, 200)
            return { ...state }
        case LOCK_REPEAT:
            setTimeout(() => {
                db.ref('pods/' + podID + '/' + user.user_id).update({ name: userName, viewing: action.payload.repeatID })
            }, 200)
            return { ...state }
        case GET_LOCKED_REPEATS_FROM_FIREBASE:
            let newRepeats = state.repeats
            state.repeats.forEach(repeat => repeat.lock = false)
            for (let repeat in action.payload) {
                if (action.payload[repeat].viewing) {
                    let result = newRepeats.findIndex(oldrepeat => oldrepeat.repeat_id === action.payload[repeat].viewing)
                    if (result !== -1) {
                        state.repeats[result].lock = true
                        state.repeats[result].viewer = action.payload[repeat].name
                    }
                }
            }
            return { ...state, repeats: [...state.repeats] }
        case GET_REPEATS:
            return {
                ...state,
                repeats: [],
                fetching: true
            }
        case GET_REPEATS_SUCCESS:
            return {
                ...state,
                repeats: action.payload.data.data,
                totalCount: action.payload.data.pagination.total_count,
                rowsPerPage: initialState.rowsPerPage,
                fetching: false,
                toggleDate: action.payload.data.pagination.sort === 'date_created:asc' ? false : true
            }
        case GET_REPEATS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.error
            }
        default:
            return state
    }
}