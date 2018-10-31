import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Protected Routes
import User from '../User/User'
import Repeats from '../RepeatsList/RepeatsList'

// These Routes are nested in App.js. The header stays static and we only change the content below it
export const ProtectedRoutes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Repeats} />
            <Route exact path='/user' component={User} />
        </Switch>
    )
}