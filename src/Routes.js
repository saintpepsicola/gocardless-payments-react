import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './components/App'
import AuthUser from './auth_user'
import { connect } from 'react-redux'
import * as actions from './redux/authentication'

// const isAuthenticated = () => {
//     const cookies = new Cookies();
//     const token = cookies.get('podToken-189247ca-76de-45c8-8d29-de3f4d8ff360');
//     if (token) {
//         console.log('Authenticated');
//         return true;
//     }
//     console.log('Not authenticated');
//     const url = `${process.env.REACT_APP_AUTH_URL}/login?client_id=${process.env.REACT_APP_CLIENT_ID}`;
//     window.location = url;
//     return false;
// }

class Routes extends Component {

    componentWillMount() {
        // Check if authenticated
        this.props.isAuthenticated()
    }

    render() {
        console.log(this.props)
        // Check if authenticated
        setTimeout(() => {
            if (!this.props.authenticated) {
                console.log('Not authed')
                const url = `${process.env.REACT_APP_AUTH_URL}/login?client_id=${process.env.REACT_APP_CLIENT_ID}`
                window.location = url
                return false;
            }
        }, 10)

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/auth' component={AuthUser} />
                    <Route exact path='/' component={App} />
                </Switch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: true
})

export default connect(mapStateToProps, actions)(Routes)