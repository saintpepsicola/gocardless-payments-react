import React from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

// Protected Routes
import { Dashboard, OrderDetailsPage, SearchBar } from './Views'
import AppBar from '../AppBar/AppBarContainer'

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
        <FullWidthBlueBar >
            <AppBar />
            <Container> <SearchBar /> </Container>
        </FullWidthBlueBar >
        <Container>
            <Route exact path="/" component={Dashboard} />
            <Route exact path='/order/:orderID' component={OrderDetailsPage} />
        </Container>
    </div>
)

const Container = styled.div`
max-width:1100px;
margin: 0 auto;
`

const FullWidthBlueBar = styled.div`
width:100%;
backdrop-filter: blur(8px);
background-image: linear-gradient(to top, #257397, #24678b);
`

