import { connect } from 'react-redux'
import Comments from './Comments'
import * as actions from '../../../redux/repeats'

const mapStateToProps = (state) => ({
    repeat: state.repeats.selectedRepeat,
    comments: state.repeats.comments
})

export default connect(mapStateToProps, actions)(Comments) 