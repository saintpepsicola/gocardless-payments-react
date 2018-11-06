import { connect } from 'react-redux'
import QuickActions from './QuickActions'
import * as actions from '../../redux/userInterface'

const mapStateToProps = (state) => ({
    panels: state.userInterface.panels
})

export default connect(mapStateToProps, actions)(QuickActions) 