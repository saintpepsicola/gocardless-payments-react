import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import UserAvatar from './UserAvatar/UserAvatar'
import headerBackground from '../../resources/header-bg.png'
import { Flex, Box } from 'reflexbox'
import { withRouter } from "react-router"

class AppBar extends Component {

    render() {
        if (!this.props.profilePage)
            return (
                <FullWidthBlueBar >
                    <Container p={2} align='center' justify='center'>
                        <Box w={1 / 2}><UserAvatar {...this.props} /></Box>
                        <Box w={1 / 2}><Logo /></Box>
                    </Container>
                </ FullWidthBlueBar>
            )
        else
            return (
                <FullWidthProfileBar >
                    <Container p={2} align='center' justify='center'>
                        <Box w={1 / 2}><Logo /></Box>
                        <Box w={1 / 2}><Podname>{this.props.podName}</Podname></Box>
                    </Container>
                </FullWidthProfileBar>)
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
height:110px;
width:100%;
background-image:url(${headerBackground});
background-repeat: repeat-x;
background-size:contain;
`

const FullWidthProfileBar = styled.div`
height:110px;
width:100%;
background-color:#EFEEEF;
`

const Podname = styled.p`
font-size: 18px;
text-align: right;
color: #878787;
`