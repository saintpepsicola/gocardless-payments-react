import { connect } from 'react-redux'
import ProgressSpinner from './ProgressSpinner'

const mapStateToProps = (state) => ({
    fetching: state.repeats.fetching
})

export default connect(mapStateToProps, null)(ProgressSpinner)