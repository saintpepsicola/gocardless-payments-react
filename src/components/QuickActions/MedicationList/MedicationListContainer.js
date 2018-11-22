import { connect } from 'react-redux'
import MedicationList from './MedicationList'
import * as actions from '../../../redux/repeats'

const mapStateToProps = (state) => ({
    repeat: state.repeats.selectedRepeat
})

export default connect(mapStateToProps, actions)(MedicationList) 