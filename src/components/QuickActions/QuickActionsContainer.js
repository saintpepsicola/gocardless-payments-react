import { connect } from 'react-redux'
import QuickActions from './QuickActions'
import * as actions from '../../redux/userInterface'

const mapStateToProps = (state) => ({
    panels: state.userInterface.panels,
    repeats: state.repeats.repeats,
    repeat: state.repeats.selectedRepeat
})

export default connect(mapStateToProps, actions)(QuickActions) 