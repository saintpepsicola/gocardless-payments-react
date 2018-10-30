import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './components/App'
import AuthUser from './components/Authentication/Authentication'
import { connect } from 'react-redux'
import * as actions from './redux/authentication'

class Routes extends Component {

    componentWillMount() {
        // Check if authenticated
        this.props.isAuthenticated()
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/auth' component={AuthUser} />
                    {/* Check if authenticated */}
                    {!this.props.authenticated && this.props.redirectToAuth()}
                    {this.props.authenticated && <Route exact path='/' component={App} />}
                </Switch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.authentication.authenticated
})

export default connect(mapStateToProps, actions)(Routes)