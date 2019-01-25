import { connect } from 'react-redux'
import Search from './Search'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
  repeatsFilter: state.repeats.repeatsFilter,
  rowsPerPage: state.repeats.rowsPerPage,
  searchField: state.repeats.searchField,
  showSearchFilters: state.repeats.showSearchFilters,
  showFilterIcon: state.repeats.showFilterIcon
})

export default connect(mapStateToProps, actions)(Search)