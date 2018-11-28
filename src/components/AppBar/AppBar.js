import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import UserAvatar from '../UserAvatar/UserAvatarContainer'
import headerBackground from '../../resources/header-bg.png'
import { Flex, Box } from 'reflexbox'

export default class AppBar extends Component {

    componentDidMount() {
        // setInterval(() => this.props.getRepeats(), 300000)
    }

    render() {
        return (
            <FullWidthBlueBar>
                <Container p={2} align='center' justify='center'>
                    <Box w={1 / 2}><UserAvatar /></Box>
                    <Box w={1 / 2}><Logo /></Box>
                </Container>
            </ FullWidthBlueBar>
        )
    }
}

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