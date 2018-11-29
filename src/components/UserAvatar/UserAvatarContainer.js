import { connect } from 'react-redux'
import UserAvatar from './UserAvatar'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
  userName: state.repeats.userName,
  podName: state.repeats.podName
})

export default connect(mapStateToProps, actions)(UserAvatar)