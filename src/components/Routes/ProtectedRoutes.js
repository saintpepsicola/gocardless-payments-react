import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Protected Routes
import Repeats from '../RepeatsList/RepeatsList'

import { Dashboard } from './Views'

// These Routes are nested in App.js. The header stays static and we only change the content below it
export const ProtectedRoutes = () => {
    return (
        <Switch>
            <Route exact path='/order/:orderID' component={Repeats} />
            <Route exact path='/' component={Dashboard} />
        </Switch>
    )
} 