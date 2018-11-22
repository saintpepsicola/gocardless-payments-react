import { connect } from 'react-redux'
import Routes from './Routes'
import * as actions from '../../redux/authentication'

const mapStateToProps = (state) => ({
    authenticated: state.authentication.authenticated
})

export default connect(mapStateToProps, actions)(Routes)