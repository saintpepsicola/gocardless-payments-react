import { connect } from 'react-redux'
import RepeatsList from './RepeatsList'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
    panels: state.userInterface.panels,
    repeats: state.repeats.repeats
})

export default connect(mapStateToProps, actions)(RepeatsList) 