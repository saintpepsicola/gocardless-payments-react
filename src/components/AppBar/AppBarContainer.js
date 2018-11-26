import { connect } from 'react-redux'
import AppBar from './AppBar'
import * as actions from '../../redux/repeats'


export default connect(null, actions)(AppBar)