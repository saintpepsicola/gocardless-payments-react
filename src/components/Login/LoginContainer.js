import { connect } from 'react-redux'
import * as actions from '../../redux/authentication'
import Login from './Login'

const mapStateToProps = (state) => ({
    error: state.authentication.loginError,
    authenticated: state.authentication.authenticated
})

export default connect(mapStateToProps, actions)(Login)