import { connect } from 'react-redux'
import UserProfile from './UserProfile'
import * as actions from '../../redux/authentication'

const mapStateToProps = (state) => ({
    userName: state.authentication.userName,
    podName: state.authentication.podName,
    podID: state.authentication.podID,
    user: state.authentication.user,
    team: state.authentication.team
})

export default connect(mapStateToProps, actions)(UserProfile)
