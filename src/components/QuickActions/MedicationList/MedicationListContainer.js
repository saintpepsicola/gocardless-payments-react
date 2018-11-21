import { connect } from 'react-redux'
import MedicationList from './MedicationList'
import * as actions from '../../../redux/repeats'

const mapStateToProps = (state) => ({
    patient: state.repeats.patient,
    repeat: state.repeats.selectedRepeat
})

export default connect(mapStateToProps, actions)(MedicationList) 