import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import UserAvatar from './UserAvatar'
import { Flex, Box } from 'reflexbox'
import { withRouter } from "react-router"

class AppBar extends Component {
    render() {
        return (
            <FullWidthBlueBar >
                <Container p={2} align='center' justify='center'>
                    <Box w={1 / 2}><UserAvatar {...this.props} /></Box>
                    <Box w={1 / 2}><Logo /></Box>
                </Container>
            </ FullWidthBlueBar>
        )
    }
}

export default withRouter(AppBar)
const Container = styled(Flex)`
max-width:1100px;
height:100%;
margin:0 auto;
box-sizing:border-box;
& > div:nth-child(2)
{
text-align:right;
}
`
const FullWidthBlueBar = styled.div`

`