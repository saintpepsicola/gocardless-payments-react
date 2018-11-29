import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import UserAvatar from '../UserAvatar/UserAvatarContainer'
import headerBackground from '../../resources/header-bg.png'
import { Flex, Box } from 'reflexbox'
import Button from '@material-ui/core/Button';

export default class AppBar extends Component {

    handleLogout() {
        let confirm = window.confirm('Are you sure you wish to logout?')
        if (confirm) {
            this.props.logout()          
        }
    }

    render() {
        return (
            <FullWidthBlueBar>
                <Container p={2} align='center' justify='center'>
                    <Box w={1 / 2}><UserAvatar /></Box>
                    <Box w={1 / 2}><Logo />
                      <br />
                      <LogoutButton onClick={this.handleLogout.bind(this)}>Log out</LogoutButton>
                    </Box>
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

const LogoutButton = styled(Button)`
  && {
      color: white;
  }
`