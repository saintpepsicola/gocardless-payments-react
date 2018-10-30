import { connect } from 'react-redux'
import AppBar from './AppBar'
import * as actions from '../../redux/login'

export default connect(null, actions)(AppBar)