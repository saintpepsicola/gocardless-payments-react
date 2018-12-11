import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

// Public Routes
import LoginPage from '../Login/LoginContainer'
import App from '../App'

export default class Routes extends Component {

    render() {
        // Private routes are only available when Props {authenticated:true}. If not, they'll redirect the user to the auth service :)
        const PrivateRoute = ({ component: Component, ...rest }) => {
            return (<Route {...rest} render={props =>
                this.props.authenticated ? (<Component {...props} />) : <Redirect to='/login' />
            } />)
        }
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={process.env.PUBLIC_URL + '/login'} component={LoginPage} />
                    <PrivateRoute path={process.env.PUBLIC_URL + '/'} component={App} />
                </Switch>
            </BrowserRouter>
        )
    }
}