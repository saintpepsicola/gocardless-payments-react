import { connect } from 'react-redux'
import AppBar from './AppBar'
import * as actions from '../../redux/authentication'

export default connect(null, actions)(AppBar)