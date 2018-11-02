import React, { Component } from 'react'
import styled from 'styled-components'
import avatarSrc from '../../resources/avatar.jpg'

export default class UserAvatar extends Component {

    render() {
        return (
            <Avatar>
                <img alt='user-avatar' src={avatarSrc} />
            </Avatar>
        )
    }
}

// Styled Components
const Avatar = styled.div`
  text-align:left;
  & > img
  {
    text-align:left;
    max-height:60px;
    width:auto;
    border-radius:50%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
`