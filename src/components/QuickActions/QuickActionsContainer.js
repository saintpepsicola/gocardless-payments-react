import { connect } from 'react-redux'
import QuickActions from './QuickActions'
import * as actions from '../../redux/userInterface'

const mapStateToProps = (state) => ({
    panels: state.userInterface.panels,
    repeats: state.repeats.repeats,
    selectedRepeat: state.repeats.selectedRepeat,
    patient: state.repeats.patient
})

export default connect(mapStateToProps, actions)(QuickActions) 