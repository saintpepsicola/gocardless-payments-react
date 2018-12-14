import React, { Component } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { Flex, Box } from 'reflexbox'
import Drawer from '@material-ui/core/Drawer'
import UserProfile from '../UserProfile/UserProfileContainer'

export default class UserAvatar extends Component {

    handleClick() {
        this.props.showProfile()
    }

    render() {
        return (
            <Avatar >
                <Drawer open={this.props.profilePage}>
                    <UserProfile />
                </Drawer>
                <Flex onClick={this.handleClick.bind(this)}>
                    <Box pt='6px'>
                        <Name variant='subtitle1'>{this.props.userName}</Name>
                        <Name variant='subtitle1'>{this.props.podName}</Name>
                    </Box>
                </Flex>
            </Avatar >
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
