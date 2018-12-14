import { connect } from 'react-redux'
import UserProfile from './UserProfile'
import * as actions from '../../redux/authentication'

const mapStateToProps = (state) => ({
    userName: state.authentication.userName,
    podName: state.authentication.podName
})

export default connect(mapStateToProps, actions)(UserProfile)
