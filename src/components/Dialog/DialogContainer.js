import { connect } from 'react-redux'
import Dialog from './Dialog'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
    dialog: state.repeats.showDialog
})

export default connect(mapStateToProps, actions)(Dialog)