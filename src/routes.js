import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import App from './components/App'
import Projects from './components/Projects/ProjectsContainer'
import ProjectReadme from './components/ProjectReadme/ProjectReadmeContainer'

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/:user' component={Projects} />
                <Route exact path='/:user/:project' component={ProjectReadme} />
            </Switch>
        </BrowserRouter>
    )
} 