import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import Login from './components/Login/LoginContainer'
import App from './components/App'


export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
            </Switch>
        </BrowserRouter>
    )
} 