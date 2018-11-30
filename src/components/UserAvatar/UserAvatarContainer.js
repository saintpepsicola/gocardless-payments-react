import { connect } from 'react-redux'
import UserAvatar from './UserAvatar'

const mapStateToProps = (state) => ({
  userName: state.authentication.userName,
  podName: state.authentication.podName
})

export default connect(mapStateToProps, null)(UserAvatar)