// Initial State
let initialState = {
    repeats: [],
    error: null,
    fetching: false
}

// Dummy Data 
function createData(name, order, date, status, comments) {
    return { name, order, date, status, comments }
}
initialState.repeats = [
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Pending', true),
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Pending'),
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Pending'),
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Accepted', true),
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Accepted'),
    createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Rejected')
]

const REACT_APP_CLIENT_ID = process.env.NODE_ENV === 'production' ? `Ac51a1bc845457` : process.env.REACT_APP_CLIENT_ID

// Action constants
const GET_REPEATS = 'GET_REPEATS'
const GET_REPEATS_SUCCESS = 'GET_REPEATS_SUCCESS'
const GET_REPEATS_FAILURE = 'GET_REPEATS_FAILURE'
// Action creators

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6IjIwMTc3NzcwLWJiNDAtMTFlOC1hOTdkLTc5YjU0OWQwZjYxMyIsImV4cCI6MTU0NTkxNDQ3MiwiaWF0IjoxNTM3Mjc0NDcyLCJ1c2VyX2lkIjoiNWI5YTFlNjAtMTU2NC0xMWU4LWFmMzMtZGQwMTdhNzBjMGM5In0.VqF2eRO2ldFMPkyYuBhsRdJaqvtKUgbS22RUFMCQOMM'

export const getRepeats = (podID) => {
    return ({
        types: [GET_REPEATS, GET_REPEATS_SUCCESS, GET_REPEATS_FAILURE],
        payload: {
            request: {
                url: 'https://api.84r.co/pods/42a9d970-ba8e-11e8-910c-e34a14d05923/repeats?is_active=true',
                headers:
                {
                    'Token': token,
                    'crossDomain': true,
                    'client-id': REACT_APP_CLIENT_ID
                }
            }
        }
    })
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_REPEATS:
            return {
                ...state,
                fetching: true
            }
        case GET_REPEATS_SUCCESS:
            return {
                ...state,
                fetching: false
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
