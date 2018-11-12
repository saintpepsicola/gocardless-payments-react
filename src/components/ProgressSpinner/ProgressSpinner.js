import React, { Component } from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

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
            Honey, It's time to spin!
         </Container>
    )
}

const Container = styled(Flex)`
text-align: center;
width: 100%;
box-sizing: border-box;
position: absolute;
top:0;
left:0;
z-index: 1;
height: 100vh;
`