import React, { Component } from 'react'
import AppBar from './AppBar/AppBarContainer'
import Repeats from './RepeatsList/RepeatsList'
import styled from 'styled-components'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <Container center="xs" middle="xs">
          <Repeats />
        </Container>
      </div>
    );
  }
}

export default App

// Styled Components
const Container = styled.section`
      margin:0 auto;
      width:1100px;
`;