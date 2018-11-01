import React, { Component } from 'react'
import AppBar from './AppBar/AppBarContainer'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { ProtectedRoutes } from './Routes/ProtectedRoutes'

type Props ={}
class App extends Component<Props> {
  render() {
    return (
      <div>
        <AppBar />
        <Container center="xs" middle="xs">
          <BrowserRouter>
            <ProtectedRoutes />
          </BrowserRouter>
        </Container>
      </div>
    )
  }
}

export default App

// Styled Components
const Container = styled.section`
  margin:0 auto;
  width:1100px;
`