import { connect } from 'react-redux'
import OrderHistory from './OrderHistory'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
  repeatHistory: state.repeats.repeatHistory,
  fetching: state.repeats.fetching
})

export default connect(mapStateToProps, actions)(OrderHistory) 