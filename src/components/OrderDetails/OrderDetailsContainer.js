import { connect } from 'react-redux'
import OrderDetails from './OrderDetails'

const mapStateToProps = (state) => ({
    patient: state.repeats.patient
})

export default connect(mapStateToProps, null)(OrderDetails) 