import { connect } from 'react-redux'
import UserAvatar from './UserAvatar'

const mapStateToProps = (state) => ({
  userName: state.repeats.userName,
  podName: state.repeats.podName
})

export default connect(mapStateToProps, null)(UserAvatar)