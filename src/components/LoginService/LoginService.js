import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/authentication'

class Authentication extends React.Component  {
    componentDidMount() {
        // Authenticate User
        console.log('LOGINSERVICE: ', this.props, this.props.location, this.props.history)
        this.props.authenticate(this.props.location.search, this.props.history)
    }

    render()
    {
        return(<p>Authenticating..</p>)
    }
}

export default connect(null, actions)(Authentication)