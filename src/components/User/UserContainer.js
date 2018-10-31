import { connect } from 'react-redux'
import User from './User'
import * as actions from '../../redux/authentication'

export default connect(null, actions)(User)