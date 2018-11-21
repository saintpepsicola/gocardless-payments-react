import { connect } from 'react-redux'
import OrderDetails from './OrderDetails'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
    patient: state.repeats.patient,
    repeat: state.repeats.selectedRepeat,
    fetching: state.repeats.fetching
})

export default connect(mapStateToProps, actions)(OrderDetails) 