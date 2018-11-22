// Initial State
let initialState = {
    repeats: [],
    error: null,
    fetching: false,
    repeatsFilter: false,
    patient: {
        nhs: '662527',
        email: 'stephan.jones@mail.com',
        tel: '0998 443333',
        mob: '0999 444473',
        address: `55 Parkside \nEast Road \nCambridge \nCB1 1SS`,
        nominated_surgery: `Trumpington Street Medical \nTrumpington Street \nCambridge \nCB1 1HH`,
        nominated_pharmacy: `Petersfield Pharmacy \n12 Lansfield Road \nCambridge \nCB1 1EA`,
        medications: [
            { name: '29 Vitamins C', value: true },
            { name: '21 Vitamins D', value: true },
            { name: '28 Lipitor 200mg', value: true },
            { name: '29 Vitamins C', value: true },
            { name: '21 Vitamins D', value: true }],
        previous_medications: [
            { name: '29 Vitamins C', value: true },
            { name: '21 Vitamins D', value: true },
            { name: '28 Lipitor 200mg', value: true },
            { name: '29 Vitamins C', value: true },
            { name: '21 Vitamins D', value: true },
            { name: '29 Vitamins C', value: true },
            { name: '21 Vitamins D', value: true },
            { name: '28 Lipitor 200mg', value: true },
            { name: '29 Vitamins C', value: true },
            { name: '21 Vitamins D', value: true }]
    }

}

// const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const podID = '2c0a7fc0-8c09-11e8-9ff3-cb58e7e51351'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6ImQ2YTg0NDYwLWVjMGEtMTFlOC04OTk3LTU1Zjc5YzY2ZWYyZiIsImV4cCI6MTU1MTI3OTE5MiwiaWF0IjoxNTQyNjM5MTkyLCJ1c2VyX2lkIjoiMzE0MDdjZDAtN2I5YS0xMWU4LWExZTYtYzI3YTEzODYwMDRmIn0.TymvgxQvK4YAkRX4R33O6tgjdz1cFBqoMhqdeofQTHI'
const clientID = 'vAc51a1bc845457'

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

// Toggle Repeats filter : ACTIVE / INACTIVE
const TOGGLE_REPEATS = 'TOGGLE_REPEATS'

// Action creators
export const toggleMedication = (id) => {
    return ({
        type: TOGGLE_MEDICATION,
        payload: {
            id: id
        }
    })
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
        payload: {
            id: id
        }
    })
}

export const getRepeat = (repeatID) => {
    return ({
        types: [GET_REPEAT, GET_REPEAT_SUCCESS, GET_REPEAT_FAILURE],
        payload: {
            request: {
                url: `https://api.84r.co/pods/${podID}/repeats/${repeatID}`,
                headers:
                {
                    'Token': token,
                    'crossDomain': true,
                    'client-id': clientID
                }
            }
        }
    })
}

export const getRepeats = () => {
    return ({
        types: [GET_REPEATS, GET_REPEATS_SUCCESS, GET_REPEATS_FAILURE],
        payload: {
            request: {
                url: `https://api.84r.co/pods/${podID}/repeats?page=1&page_size=10`,
                headers:
                {
                    'Token': token,
                    'crossDomain': true,
                    'client-id': clientID
                }
            }
        }
    })
}

export const searchRepeats = (name) => {
    return ({
        types: [SEARCH_REPEATS, SEARCH_REPEATS_SUCCESS, SEARCH_REPEATS_FAILURE],
        payload: {
            request: {
                url: `https://api.84r.co/pods/${podID}/patients/search`,
                method: 'POST',
                data: {
                    name: 'J',
                    lastName: 'Flintstone'
                },
                headers:
                {
                    'Token': token,
                    'crossDomain': true,
                    'client-id': clientID
                }
            }
        }
    })
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_REPEATS:
            console.log(action)
            return {
                ...state
            }
        case TOGGLE_MEDICATION:
            let medication = state.selectedRepeat.remedies[action.payload.id]
            medication.approved = medication.approved ? false : true
            return {
                ...state, selectedRepeat: { ...state.selectedRepeat, remedies: state.selectedRepeat.remedies }
            }
        case SELECT_REPEAT:
            console.log(action)
            console.log(state.repeats.map(repeat => console.log(repeat)))
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
            console.log(action.payload.data)
            return {
                ...state,
                fetching: false
            }
        case SEARCH_REPEATS_FAILURE:
            console.log('Request fail')
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
            // console.log(action)
            return {
                ...state,
                fetching: false,
                selectedRepeat: action.payload.data.data[0]
            }
        case GET_REPEAT_FAILURE:
            console.log('Request fail')
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
            // console.log(action)
            return {
                ...state,
                fetching: false,
                repeats: action.payload.data.data
            }
        case GET_REPEATS_FAILURE:
            console.log('Request fail')
            return {
                ...state,
                error: action.error,
                fetching: false
            }
        default:
            return state
    }
}
