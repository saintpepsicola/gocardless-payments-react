// Initial State
let initialState = {
  patients: [],
  error: null,
  fetching: false
}

const REACT_APP_CLIENT_ID = process.env.NODE_ENV === 'production' ? `Ac51a1bc845457` : process.env.REACT_APP_CLIENT_ID

// Action constants
const SEARCH_PATIENTS = 'SEARCH_PATIENTS'
const SEARCH_PATIENTS_SUCCESS = 'SEARCH_PATIENTS_SUCCESS'
const SEARCH_PATIENTS_FAILURE = 'SEARCH_PATIENTS_FAILURE'
// Action creators

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl9pZCI6IjIwMTc3NzcwLWJiNDAtMTFlOC1hOTdkLTc5YjU0OWQwZjYxMyIsImV4cCI6MTU0NTkxNDQ3MiwiaWF0IjoxNTM3Mjc0NDcyLCJ1c2VyX2lkIjoiNWI5YTFlNjAtMTU2NC0xMWU4LWFmMzMtZGQwMTdhNzBjMGM5In0.VqF2eRO2ldFMPkyYuBhsRdJaqvtKUgbS22RUFMCQOMM'

export const searchPatients = (podID) => {
  return ({
    types: [SEARCH_PATIENTS, SEARCH_PATIENTS_SUCCESS, SEARCH_PATIENTS_FAILURE],
    payload: {
      request: {
        url: 'https://api.84r.co/pods/42a9d970-ba8e-11e8-910c-e34a14d05923/patients/search',
        headers: {
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
    case SEARCH_PATIENTS:
      return {
        ...state,
        fetching: true
      }
    case SEARCH_PATIENTS_SUCCESS:
      return {
        ...state,
        fetching: false
      }
    case SEARCH_PATIENTS_FAILURE:
      return {
        ...state,
        error: action.error,
        fetching: false
      }
    default:
      return state
  }
}
