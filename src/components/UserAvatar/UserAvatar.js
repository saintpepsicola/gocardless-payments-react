import React, { Component } from 'react'
import styled from 'styled-components'
import avatarSrc from '../../resources/avatar.jpg'
import Typography from '@material-ui/core/Typography'
import { Flex, Box } from 'reflexbox'

export default class UserAvatar extends Component {

    render() {
        return (
            <Avatar>
                <Flex>
                    <Box mr='15px'><Image alt='user-avatar' src={avatarSrc} /></Box>
                    <Box pt='6px'>
                        <Name variant='subtitle1'>Theodore Medina</Name>
                        <Name variant='subtitle2'>Dartford, Gravesham and Swanley CCG</Name>
                    </Box>
                </Flex>
            </Avatar>
        )
    }
}

// Styled Components
const Name = styled(Typography)`
  color:white !important;
`

const Avatar = styled.div`
  text-align:left;
`

const Image = styled.img`
    text-align:left;
    max-height:60px;
    width:auto;
    border-radius:50%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`