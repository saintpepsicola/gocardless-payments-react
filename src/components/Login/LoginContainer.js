import { connect } from 'react-redux'
import Login from './Login'
import * as actions from '../../redux/login'

export default connect(null, actions)(Login)