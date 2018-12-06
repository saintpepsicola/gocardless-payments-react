import { connect } from 'react-redux'
import OrderDetails from './OrderDetails'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
    repeat: state.repeats.selectedRepeat,
    repeatHistory: state.repeats.repeatHistory,
    repeatsFilter: state.repeats.repeatsFilter,
    fetching: state.repeats.fetching
})

export default connect(mapStateToProps, actions)(OrderDetails) 