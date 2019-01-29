import { connect } from 'react-redux'
import SidePanel from './SidePanel'
import * as interfaceActions from '../../../redux/userInterface'
import * as stateActions from '../../../redux/repeats'

const mapStateToProps = (state) => ({
  panels: state.userInterface.panels,
  repeat: state.repeats.selectedRepeat
})

export default connect(mapStateToProps, { ...interfaceActions, ...stateActions })(SidePanel) 