import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Protected Routes
import { Dashboard, OrderDetailsPage, SearchBar } from './Views'

// These Routes are nested in App.js. The header stays static and we only change the content below it
export const ProtectedRoutes = () => {
    return (
        <Switch>
            <Route path='/' component={Layout} />
        </Switch>
    )
}

const Layout = () => (
    <div>
        <SearchBar />
        <Route exact path="/" component={Dashboard} />
        <Route exact path='/order/:orderID' component={OrderDetailsPage} />
    </div>
)

