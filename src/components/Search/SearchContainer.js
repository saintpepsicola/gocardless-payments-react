import { connect } from 'react-redux'
import Search from './Search'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
  repeatsFilter: state.repeats.repeatsFilter
})

export default connect(mapStateToProps, actions)(Search)