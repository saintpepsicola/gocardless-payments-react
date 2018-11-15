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
        address: `
        55 Parkside
        East Road
        Cambridge
        CB1 1SS
        `,
        nominated_surgery: `
        Trumpington Street Medical 
        Trumpington Street
        Cambridge
        CB1 1HH
        `,
        nominated_pharmacy: `
        Petersfield Pharmacy
        12 Lansfield Road
        Cambridge
        CB1 1EA
        `
    }
}

// Dummy Data 
// function createData(name, order, date, status, comments) {
//     return { name, order, date, status, comments }
// }

// initialState.repeats = [
//     createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Pending', true),
//     createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Pending'),
//     createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Pending'),
//     createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Accepted', true),
//     createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Accepted'),
//     createData('Stephen George James', '3 Medications', 'Today 12:03 PM', 'Rejected')
// ]

// const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const podID = '42a9d970-ba8e-11e8-910c-e34a14d05923'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6ImNiYzE3ZjEwLWU4YzQtMTFlOC1hN2M3LWU2Y2EzYmYzMzg4NSIsImV4cCI6MTU1MDkxOTI1NiwiaWF0IjoxNTQyMjc5MjU2LCJ1c2VyX2lkIjoiMzE0MDdjZDAtN2I5YS0xMWU4LWExZTYtYzI3YTEzODYwMDRmIn0.YxQZhsS4jX_4LL-er5cqSiAO677-CVXqKAwzmdL9aF4'
const clientID = 'mrv31k5Ar1aXaod'

// Action constants
const GET_REPEATS = 'GET_REPEATS'
const GET_REPEATS_SUCCESS = 'GET_REPEATS_SUCCESS'
const GET_REPEATS_FAILURE = 'GET_REPEATS_FAILURE'

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

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_REPEAT:
            console.log(action)
            return {
                ...state,
                selectedRepeat: action.payload
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
