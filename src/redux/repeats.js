// Initial State
let initialState = {
    repeats: [],
    error: null,
    fetching: false,
    patient: {
        nhs: '662527',
        email: 'stephan.jones@mail.com',
        tel: '0998 443333',
        mob: '0999 444473',
        address: `55 Parkside \nEast Road \nCambridge \nCB1 1SS`,
        nominated_surgery: `Trumpington Street Medical \nTrumpington Street \nCambridge \nCB1 1HH`,
        nominated_pharmacy: `Petersfield Pharmacy \n12 Lansfield Road \nCambridge \nCB1 1EA
        `
    }
}

// const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const podID = '42a9d970-ba8e-11e8-910c-e34a14d05923'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6ImQ2YTg0NDYwLWVjMGEtMTFlOC04OTk3LTU1Zjc5YzY2ZWYyZiIsImV4cCI6MTU1MTI3OTE5MiwiaWF0IjoxNTQyNjM5MTkyLCJ1c2VyX2lkIjoiMzE0MDdjZDAtN2I5YS0xMWU4LWExZTYtYzI3YTEzODYwMDRmIn0.TymvgxQvK4YAkRX4R33O6tgjdz1cFBqoMhqdeofQTHI'
const clientID = 'mrv31k5Ar1aXaod'

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

const SELECT_REPEAT = 'SELECT_REPEAT'

// Action creators
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
                url: `https://api.84r.co/pods/${podID}/repeats`,
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
        case SELECT_REPEAT:
            console.log(action)
            //let selRepeat = action.payload
            console.log(state.repeats.map(repeat => console.log(repeat)))
            return {
                ...state,
                selectedRepeat: action.payload
            }
        case SEARCH_REPEATS:
            // console.log(action)
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
            //console.log(action)
            return {
                ...state,
                selectedRepeat: null,
                fetching: true
            }
        case GET_REPEAT_SUCCESS:
            //console.log(action.payload.data.data[0])
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
            //console.log(action)
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
