import { connect } from 'react-redux'
import RepeatsList from './RepeatsList'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
    panels: state.userInterface.panels,
    repeats: state.repeats.repeats,
    totalCount: state.repeats.totalCount,
    rowsPerPage: state.repeats.rowsPerPage,
    repeatsFilter: state.repeats.repeatsFilter,
    page: state.repeats.page
})

export default connect(mapStateToProps, actions)(RepeatsList) 