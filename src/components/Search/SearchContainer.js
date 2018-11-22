import { connect } from 'react-redux'
import Search from './Search'
import * as actions from '../../redux/repeats'

const mapStateToProps = (state) => ({
  activeRepeats: state.repeats.repeats.filter(repeat => repeat.gp_status === 'delivered').length
})

export default connect(mapStateToProps, actions)(Search)