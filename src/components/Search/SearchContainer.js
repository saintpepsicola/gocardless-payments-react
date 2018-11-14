import { connect } from 'react-redux'
import Search from './Search'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
  patients: state.patients
})

export default connect(mapStateToProps, actions)(Search)