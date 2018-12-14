import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Protected Routes
import { Dashboard, OrderDetailsPage, OuickActionsPage, UserProfilePage } from './Views'

// These Routes are nested in App.js. The header stays static and we only change the content below it
export const ProtectedRoutes = () => {
    return (
        <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/'} component={Dashboard} />
            <Route exact path={process.env.PUBLIC_URL + '/profile'} component={UserProfilePage} />
            <Route exact path={process.env.PUBLIC_URL + '/qorder/:orderID'} component={OuickActionsPage} />
            <Route exact path={process.env.PUBLIC_URL + '/order/:orderID'} component={OrderDetailsPage} />
        </Switch>
    )
}
