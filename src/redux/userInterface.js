// Initial State
let initialState = {
    panels: [{ id: 1, show: true, start: 0, position: 0, label: 'Comments', icon: 'CommentIcon' },
    { id: 2, show: false, start: 320, position: 320, label: 'Add', icon: 'AddIcon' },
    { id: 3, show: false, start: 640, position: 640, label: 'Refresh', icon: 'RefreshIcon' }]
}

// Set Default positions
// initialState.panels.maps(panel => panel.position = panel.start)

// Action constants
const SELECT_PANEL = 'SELECT_PANEL'

// Action creators
export const selectPanel = (id) => ({ type: SELECT_PANEL, payload: id })

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_PANEL:
            return {
                ...state,
                panels: state.panels.map(panel => {
                    panel.position = panel.start - (action.payload - 1) * 320
                    panel.show = action.payload === panel.id
                    return panel
                })
            }
        default:
            return state
    }
}