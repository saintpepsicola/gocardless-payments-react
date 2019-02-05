import { connect } from 'react-redux'
import QuickActions from './QuickActions'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
    panels: state.userInterface.panels,
    repeat: state.repeats.selectedRepeat,
    repeatsFilter: state.repeats.repeatsFilter,
    medicines: state.repeats.medicines,
    repeatHistory: state.repeats.repeatHistory,
    parentOrder: state.repeats.parentOrder
})

export default connect(mapStateToProps, actions)(QuickActions) 