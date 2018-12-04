import { connect } from 'react-redux'
import UserAvatar from './UserAvatar'
import * as actions from '../../redux/authentication'

const mapStateToProps = (state) => ({
  userName: state.authentication.userName,
  podName: state.authentication.podName
})

export default connect(mapStateToProps, actions)(UserAvatar)