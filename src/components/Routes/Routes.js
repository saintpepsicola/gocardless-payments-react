import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Public Routes
import LoginService from '../LoginService/LoginService'

import App from '../App'

export default class Routes extends Component {

    render() {
        // Private routes are only available when Props {authenticated:true}. If not, they'll redirect the user to the auth service :)
        const PrivateRoute = ({ component: Component, ...rest }) => {
            return (<Route {...rest} render={props =>
                this.props.authenticated ? (<Component {...props} />) : this.props.redirectToAuth()
            }
            />)
        }
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={process.env.PUBLIC_URL + '/auth'} component={LoginService} />
                    <PrivateRoute path={process.env.PUBLIC_URL + '/'} component={App} />
                </Switch>
            </BrowserRouter>
        )
    }
}