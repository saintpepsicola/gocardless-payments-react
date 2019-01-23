import { connect } from 'react-redux'
import MedicationList from './MedicationList'
import * as actions from '../../../redux/repeats'

const mapStateToProps = (state) => ({
    repeat: state.repeats.selectedRepeat,
    repeatsFilter: state.repeats.repeatsFilter
})

export default connect(mapStateToProps, actions)(MedicationList) 