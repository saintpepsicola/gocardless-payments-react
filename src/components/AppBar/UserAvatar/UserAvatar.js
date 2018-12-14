import React, { Component } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { Flex, Box } from 'reflexbox'

export default class UserAvatar extends Component {

    handleLogout() {
        if (window.confirm('Are you sure you wish to logout?')) {
            this.props.logout()
        }
    }

    handleClick() {

    }

    render() {
        return (
            <Avatar>
                <Flex>
                    <Box onClick={this.handleClick.bind(this)} pt='6px'>
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
    cursor:pointer;
    color:white;
}
`

const Avatar = styled.div`
  text-align:left;
`
