import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { ProtectedRoutes } from './Routes/ProtectedRoutes'
import ProgressSpinner from './ProgressSpinner/ProgressSpinnerContainer'
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

class App extends Component {
  render() {
    return (
      <div>
        <ProgressSpinner />
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
`