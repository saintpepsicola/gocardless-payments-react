import { connect } from 'react-redux'
import AppBar from './AppBar'
import * as actions from '../../redux/authentication'

const mapStateToProps = (state) => ({
    userName: state.authentication.userName,
    podName: state.authentication.podName,
    profilePage: state.authentication.profilePage
})

export default connect(mapStateToProps, actions)(AppBar)
