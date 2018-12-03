import React, { Component } from 'react'
import styled from 'styled-components'
// import avatarSrc from '../../resources/avatar.png'
import Typography from '@material-ui/core/Typography'
import { Flex, Box } from 'reflexbox'

export default class UserAvatar extends Component {

    handleLogout() {
        let confirm = window.confirm('Are you sure you wish to logout?')
        if (confirm) {
            this.props.logout()
        }
    }

    render() {
        return (
            <Avatar>
                <Flex>
                    <Box pt='6px'>
                        <Name variant='subtitle1'>{this.props.userName} • {this.props.podName}</Name>
                        <Name logout={1} variant='subtitle2' onClick={this.handleLogout.bind(this)}>Log out</Name>
                    </Box>
                </Flex>
            </Avatar>
        )
    }
}

// Styled Components
const Name = styled(Typography)`
&& {
    color:white;
    cursor: ${props => props.logout ? 'pointer' : 'auto'};
}
`

const Avatar = styled.div`
  text-align:left;
`