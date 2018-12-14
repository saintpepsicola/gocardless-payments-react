import { connect } from 'react-redux'
import TeamMembers from './TeamMembers'


const mapStateToProps = (state) => ({
    userName: state.authentication.userName,
    podName: state.authentication.podName
})

export default connect(mapStateToProps, null)(TeamMembers)