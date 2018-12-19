import { connect } from 'react-redux'
import RepeatsList from './RepeatsList'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
    panels: state.userInterface.panels,
    repeats: state.repeats.repeats,
    activeRepeats: state.repeats.activeRepeats,
    totalCount: state.repeats.totalCount,
    rowsPerPage: state.repeats.rowsPerPage,
    repeatsFilter: state.repeats.repeatsFilter,
    page: state.repeats.page,
    searchError: state.repeats.searchError,
    searchTerm: state.repeats.searchTerm,
    toggleDate: state.repeats.toggleDate
})

export default connect(mapStateToProps, actions)(RepeatsList)