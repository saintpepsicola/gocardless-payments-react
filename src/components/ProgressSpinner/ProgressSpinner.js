import React, { Component } from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'
import ReactSpinner from 'react-spinkit'

export default class ProgressSpinner extends Component {
    render() {
        return (
            <div> {this.props.fetching && <Spinner />}
            </div>)
    }
}

const Spinner = () => {
    return (
        <Container justify='center' align='center'>
            <ReactSpinner color='white' name='double-bounce' />
        </Container>
    )
}

const Container = styled(Flex)`
background:#134E5E;
text-align: center;
width: 100%;
box-sizing: border-box;
position: absolute;
top:0;
left:0;
z-index: 1;
height: 100vh;
`