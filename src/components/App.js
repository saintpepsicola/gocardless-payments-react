import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { ProtectedRoutes } from './Routes/ProtectedRoutes'
import ProgressSpinner from './ProgressSpinner/ProgressSpinnerContainer'
import { connect } from 'react-redux'
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

class App extends Component {
  render() {
    return (
      <div>
        <ProgressSpinner />
        <Container blur={this.props.modalVisible} center="xs" middle="xs">
          <BrowserRouter>
            <ProtectedRoutes />
          </BrowserRouter>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  modalVisible: state.repeats.modalVisible
})

export default connect(mapStateToProps, null)(App)

// Styled Components
const Container = styled.section`
margin:0 auto;
filter: ${props => props.blur ? 'blur(8px)' : 'none'};
`