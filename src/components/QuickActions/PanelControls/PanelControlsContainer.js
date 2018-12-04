import { connect } from 'react-redux'
import PanelControls from './PanelControls'
import * as actions from '../../../redux/userInterface'

const mapStateToProps = (state) => ({
    panels: state.userInterface.panels
})

export default connect(mapStateToProps, actions)(PanelControls) 