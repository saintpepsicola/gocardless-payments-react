import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { ProtectedRoutes } from './Routes/ProtectedRoutes'
import { Flex } from 'reflexbox'
import ReactSpinner from 'react-spinkit'
import { connect } from 'react-redux'
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

class App extends Component {
  render() {
    return (
      <div>
        <ProgressSpinner {...this.props} />
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
  modalVisible: state.repeats.modalVisible,
  fetching: state.repeats.fetching
})

export default connect(mapStateToProps, null)(App)

const ProgressSpinner = (props) => {
  return (
    <div> {props.fetching && <Spin justify='center' align='center'>
      <ReactSpinner color='#134E5E' name='line-scale-party' />
    </Spin>}
    </div>)
}


// Styled Components
const Container = styled.section`
margin:0 auto;
filter: ${props => props.blur ? 'blur(8px)' : 'none'};
`
const Spin = styled(Flex)`
text-align: center;
width: 100%;
box-sizing: border-box;
position: absolute;
top:0;
left:0;
z-index: 1;
height: 100vh;
`